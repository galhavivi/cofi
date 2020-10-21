/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from './mocks/common';
import { testAction, testActions } from '../src/actions/test-utils';
import { Steps, Actions } from '../src/actions/types';
import { createPendingAction } from '../src/actions/change-data';
import { errors } from '../src/errors';
import log from '../src/log';

describe('pending-actions', () => {
  let form;

  beforeEach(() => {
    form = cloneDeep(formMock);

    Object.assign(form.resources.hooks, {
      toDto: jest.fn(x => x.data),
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeDataChange: jest.fn(),
      afterDataChange: jest.fn(),
      beforeChangeData: jest.fn(),
      afterChangeData: jest.fn(),
    });
  });

  it('handle action with error on beforeChangeData hook - ok', async () => {
    let errorObject;
    const errorMessage = 'Something is wrong with the left phalange';
    const data = { name: 'Monica', lastName: 'Geller' };

    const orgError = log.error;
    log.error = (e) => {
      errorObject = e;
    };

    form.resources.hooks.beforeChangeData = () => {
      throw new Error(errorMessage);
    };

    const tracks = await testAction(form, Actions.CHANGE_DATA, { formId: form.model.id, data });

    expect(errorObject.code).toEqual(errors.ACTION_FAILED.code);
    expect(errorObject.subError.toString()).toEqual(`Error: ${errorMessage}`);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.ADD_ACTION, // add action to queue - changeDate
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // start - change form data
      Steps.END_ACTION, // end - change form data
      Steps.SHIFT_ACTION, // pop the first action in the queue - changeData
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
    const finalResources = tracks.privateForm[tracks.privateForm.length - 1].form.resources;

    // verify new data
    expect(finalModel.data).toEqual(form.model.data); // initial data

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, data, expect.any(Function))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const context = { userId: '123', companyId: '789' };
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true, context });
    const actionData = { formId: form.model.id, data };
    const beforeProps = {
      model: beforeModel, resources: form.resources, data: actionData, type: Actions.CHANGE_DATA,
    };

    expect(finalResources.hooks.afterChangeData).not.toHaveBeenCalled();
    expect(finalResources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalResources.hooks.afterAction).not.toHaveBeenCalled();
    expect(finalResources.hooks.beforeDataChange).toHaveBeenCalledWith(beforeProps);
    expect(finalResources.hooks.afterDataChange).not.toHaveBeenCalled();

    log.error = orgError;
  });

  it('handle 2 same actions (without debounce) and resolve both - ok', async () => {
    const data1 = { name: 'Monica', lastName: 'Geller' };
    const data2 = { name: 'Phebe', lastName: 'Buffay' };

    const actions = [
      { type: Actions.CHANGE_DATA, data: { formId: form.model.id, data: data1 } },
      { type: Actions.CHANGE_DATA, data: { formId: form.model.id, data: data2 } },
    ];

    const tracks = await testActions(form, actions);

    // verify hooks
    expect(form.resources.hooks.beforeChangeData).toHaveBeenCalledTimes(2);
    expect(form.resources.hooks.afterChangeData).toHaveBeenCalledTimes(2);
    expect(form.resources.hooks.beforeAction).toHaveBeenCalledTimes(2);
    expect(form.resources.hooks.afterAction).toHaveBeenCalledTimes(2);
    expect(form.resources.hooks.beforeDataChange).toHaveBeenCalledTimes(2);
    expect(form.resources.hooks.afterDataChange).toHaveBeenCalledTimes(2);

    // verify steps
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.ADD_ACTION, // add action to queue - changeDate 1
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // start - change form data 1
      Steps.ADD_ACTION, // add action to queue - changeDate 2
      Steps.SET_FORM_DATA, // set form context 1
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Steps.SET_FIELD_COMPONENT_STATE, // name - monica made stateChange cycle
      Steps.SET_FIELD_COMPONENT_PREV_STATE, // name
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_EVALUATION, // lastName (dependent on name)
      Steps.SET_FORM_EVALUATION, // after finish init all fields - form evaluation
      Steps.END_ACTION, // end - change form data 1
      Steps.SHIFT_ACTION, // shift the first action in the queue - changeData 1
      Steps.START_ACTION, // start - change form data 2
      Steps.SET_FORM_DATA, // set form data 2
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_EVALUATION, // lastName (dependent on name)
      Steps.SET_FORM_EVALUATION, // after finish init all fields - form evaluation
      Steps.END_ACTION, // end - change form data 2
      Steps.SHIFT_ACTION, // shift the first action in the queue - changeData 2
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.START_PROCESSING, // start form processing
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name - change data 1
      Steps.SET_FIELD_COMPONENT_STATE, // name - change data 1 - monica made stateChange cycle
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name - change data 2
      Steps.END_PROCESSING, // end form processing
    ]);

    // verify new data
    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
    expect(finalModel.data).toEqual(data2);
    expect(finalModel.pendingActions).toEqual([]);
  });

  it('handle 2 actions with error on beforeChangeData hook - ok', async () => {
    let errorObject;
    const errorMessage = 'Something is wrong with the left phalange';
    const data1 = { name: 'Monica', lastName: 'Geller' };
    const data2 = { name: 'Phebe', lastName: 'Buffay' };

    const orgError = log.error;
    log.error = (e) => {
      errorObject = e;
    };

    let times = 0;
    form.resources.hooks.beforeChangeData = (model) => {
      times += 1;
      if (times === 1) {
        throw new Error(errorMessage);
      }
    };

    const actions = [
      { type: Actions.CHANGE_DATA, data: { formId: form.model.id, data: data1 } },
      { type: Actions.CHANGE_DATA, data: { formId: form.model.id, data: data2 } },
    ];

    const tracks = await testActions(form, actions);

    expect(errorObject.code).toEqual(errors.ACTION_FAILED.code);
    expect(errorObject.subError.toString()).toEqual(`Error: ${errorMessage}`);

    // verify hooks
    expect(form.resources.hooks.afterChangeData).toHaveBeenCalledTimes(1);
    expect(form.resources.hooks.beforeAction).toHaveBeenCalledTimes(2);
    expect(form.resources.hooks.afterAction).toHaveBeenCalledTimes(1);
    expect(form.resources.hooks.beforeDataChange).toHaveBeenCalledTimes(2);
    expect(form.resources.hooks.afterDataChange).toHaveBeenCalledTimes(1);

    // verify steps
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.ADD_ACTION, // add action to queue - changeDate 1
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // start - change form data 1
      Steps.ADD_ACTION, // add action to queue - changeDate 2
      Steps.END_ACTION, // end - change form data 1
      Steps.SHIFT_ACTION, // (error occured on before hook, action ended) shift first action in the queue - changeData 1
      Steps.START_ACTION, // start - change form data 2
      Steps.SET_FORM_DATA, // set form data 2
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_EVALUATION, // lastName (dependent on name)
      Steps.SET_FORM_EVALUATION, // after finish init all fields - form evaluation
      Steps.END_ACTION, // end - change form data 2
      Steps.SHIFT_ACTION, // pop the first action in the queue - changeData 2
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.START_PROCESSING, // start form processing
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Steps.END_PROCESSING, // end form processing
    ]);

    // verify new data
    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
    expect(finalModel.data).toEqual(data2);
    expect(finalModel.pendingActions).toEqual([]);

    log.error = orgError;
  });
});
