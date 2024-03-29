/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  startProcessing,
  endProcessing,
  setForm,
  addAction,
  shiftAction,
  startAction,
  endAction,
} from './actions/creator';
import {
  Actions,
} from './actions/types';
import { createError, errors } from './errors';
import log from './log';
import { getBeforeAfterActionHookProps } from './handlers-props';

const ERROR_PREFIX = 'Process queue -';
const changeDataActions = [Actions.INIT, Actions.CHANGE_VALUE, Actions.CHANGE_DATA, Actions.RESET];

// action = { type, data, func, args, resolve }
export const addPendingAction = (formId, action) => async (getState, dispatch) => {
  // when try to add action (with debounce like changeValue) after destroy action removed form object - ignore
  if (isQueueClosed(formId)(getState)) return resolveAction(action);

  dispatch(addAction(formId, action));

  // if form is not currently processing - start processing
  if (!getState().forms[formId].model.processing) {
    // announce start processing
    dispatch(startProcessing(formId));

    // process the queue
    await processQueue(formId)(getState, dispatch);
  }
};

const processQueue = (formId) => async (getState, dispatch) => {
  let form = getState().forms[formId];
  const { model, resources } = form;

  // fetch first action (FIFO - first in first out)
  const action = model.pendingActions[0];

  // announce start action
  const start = new Date().getTime();
  dispatch(startAction(formId, action.id, action.type, action.data, { start }));

  // prepare after hooks (might be after destroy so state.forms can be undefined)
  const afterNamedAction = getNamedActionHook(resources, 'after', action.type);
  const { afterAction, afterDataChange } = resources.hooks;

  let result;
  let actionSuccess;

  try {
    const actionScopeDispatch = (step) => dispatch(step, action);

    // run before hooks
    await runBeforeHooks(formId, action, getState);

    // run the action and wait for it and its side effects to end
    result = await action.func(...action.args)(actionScopeDispatch, getState);
    actionSuccess = true;

    // run after hooks
    await runAfterHooks(formId, action, getState, afterNamedAction, afterDataChange, afterAction);
  } catch (err) {
    // error - process action fail
    const error = createError(ERROR_PREFIX, errors.ACTION_FAILED, form, { action }, [action.type], err);
    log.error(error);

    // if run action was not complete - revert to prev form state
    // exclude pending actions (form might received new actions during this time)
    if (!actionSuccess) {
      form.model.pendingActions = getState().forms[formId].model.pendingActions;
      dispatch(setForm(form.model, form.resources, form.settings));
    }
  }

  // announce end action
  const end = new Date().getTime();
  dispatch(endAction(formId, action.id, action.type, action.data, { start, end }));

  // resolve prev debounce calls that were not processed (relevant for actions with debounce)
  (action.debounceResolves || []).forEach((resolve) => resolve());

  // resolve the action
  action.resolve(result);

  if (action.type !== Actions.DESTROY) {
    // shift first action out from the queue
    dispatch(shiftAction(formId));
  }

  // if form does not exists on the store anymore (destroy action removes the form)
  // or if queue empty - end processing loop
  form = getState();
  if (!form.forms[formId] || !form.forms[formId].model.pendingActions.length) {
    // announce end processing
    dispatch(endProcessing(formId));
    return;
  }

  // recursive - process next action in the queue
  await processQueue(formId)(getState, dispatch);
};

function getNamedActionHook(resources, prefix, type) {
  let formatterActionName = type.toLowerCase().replace(/_([a-z])/g, (x) => x.slice(1).toUpperCase());
  formatterActionName = `${formatterActionName[0].toUpperCase()}${formatterActionName.slice(1)}`;
  return resources.hooks[`${prefix}${formatterActionName}`];
}

async function runBeforeHooks(formId, action, getState) {
  // run before any action hook
  const { model, resources } = getState().forms[formId];

  const props = getBeforeAfterActionHookProps(model, resources, action);
  await resources.hooks.beforeAction(props);

  // run before data change hook - if relevant
  if (changeDataActions.includes(action.type)) {
    await resources.hooks.beforeDataChange(props);
  }

  // run before action hook
  const beforeNamedAction = getNamedActionHook(resources, 'before', action.type);
  await beforeNamedAction(props);
}

async function runAfterHooks(formId, action, getState, afterNamedAction, afterDataChange, afterAction) {
  // run after action hook (might be after destroy so form.model can be undefined)
  const form = getState();
  const model = form.forms && form.forms[formId] ? form.forms[formId].model : undefined;
  const resources = form.forms && form.forms[formId] ? form.forms[formId].resources : undefined;
  const props = getBeforeAfterActionHookProps(model, resources, action);

  // run after any action hook
  await afterAction(props);

  // run after data change hook - if relevant
  if (changeDataActions.includes(action.type)) {
    await afterDataChange(props);
  }

  // run after action hook
  await afterNamedAction(props);
}

const resolveAction = (action) => {
  (action.debounceResolves || []).forEach((resolve) => resolve());
  action.resolve();
};

const isQueueClosed = (formId) => (getState) => !getState().forms[formId];
