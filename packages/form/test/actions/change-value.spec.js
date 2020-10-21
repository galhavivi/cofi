/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { errors } from '../../src/errors';
import { testAction, testActions } from '../../src/actions/test-utils';
import { Steps, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-value';
import log from '../../src/log';

describe('actions / changeValue', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeDataChange: jest.fn(),
      afterDataChange: jest.fn(),
      beforeChangeValue: jest.fn(),
      afterChangeValue: jest.fn(),
    });
  });

  it('action steps', async () => {
    const fieldId = 'name';
    const value = 'Formatted Monica';
    const tracks = await testAction(form, Actions.CHANGE_VALUE, { formId: form.model.id, fieldId, value });

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_VALUE, // name - set component value (view value)
      Steps.ADD_ACTION, // add action to queue - changeValue
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // name - change value
      Steps.SET_FIELD_VALUE, // name
      Steps.SET_FIELD_COMPONENT_STATE, // name - change state
      Steps.SET_FIELD_COMPONENT_PREV_STATE, // name
      Steps.SET_FIELD_EVALUATION, // name (excluded, disabled and errors)
      Steps.SET_FIELD_EVALUATION, // last name (excluded, disabled and errors)
      Steps.SET_FORM_EVALUATION, // when finish field + dependant fields - form evaluation (form.invalid + form.dirty)
      Steps.END_ACTION, // name - end change value
      Steps.SHIFT_ACTION, // pop the first action in the queue - changeValue
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_VALUE, // name - set component value (view value)
      Steps.START_PROCESSING, // start form processing
      Steps.SET_FIELD_COMPONENT_STATE, // name - change state
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    expect(finalForm.model.pendingActions).toEqual([]);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, fieldId, value, [{ fieldId, value }], expect.any(Function),
      expect.any(Array))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    beforeModel.fields.name.component.value = 'Formatted Monica'; // not actually before - because of the debounce
    beforeModel.fields.name.component.ready = true;
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const data = { formId: form.model.id, fieldId, value };
    const beforeProps = {
      model: beforeModel, resources: form.resources, data, type: Actions.CHANGE_VALUE,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, data, type: Actions.CHANGE_VALUE,
    };

    expect(finalForm.resources.hooks.beforeChangeValue).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeValue).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeDataChange).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterDataChange).toHaveBeenCalledWith(afterProps);
  });

  it('change name value', async () => {
    const fieldId = 'name';
    const tracks = await testAction(form, Actions.CHANGE_VALUE, { formId: form.model.id, fieldId, value: 'Formatted Monica' });

    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
    const { name, lastName } = finalModel.fields;

    // check form.data (didn't change)
    expect(finalModel.data).toEqual({ lastName: 'Green', name: 'Monica' });
    expect(finalModel.fields.name.component.value).toEqual('Formatted Monica');
    expect(finalModel.fields.name.component.state).toEqual({ mock: 1 });

    // check fields evaluation
    checkFieldEvaluation(name, false, false, [], true, false, false);
    checkFieldEvaluation(lastName, false, false, [], false, false, false);

    // check form evaluation
    expect(finalModel.invalid).toEqual(false);
    expect(finalModel.pendingActions).toEqual([]);
  });

  it('change name value - no parser and no formatter', async () => {
    const fieldId = 'name';
    delete form.model.fields.name.formatter;
    delete form.model.fields.name.parser;

    const tracks = await testAction(form, Actions.CHANGE_VALUE, { formId: form.model.id, fieldId, value: 'Monica' });
    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
    const { name, lastName } = finalModel.fields;

    // check form.data (didn't change)
    expect(finalModel.data).toEqual({ lastName: 'Green', name: 'Monica' });
    expect(finalModel.fields.name.component.value).toEqual('Monica');
    expect(finalModel.fields.name.component.state).toEqual({ mock: 1 });

    // check fields evaluation
    checkFieldEvaluation(name, false, false, [], true, false, false);
    checkFieldEvaluation(lastName, false, false, [], false, false, false);

    // check form evaluation
    expect(finalModel.invalid).toEqual(false);
    expect(finalModel.pendingActions).toEqual([]);
  });

  it('change name value - only formatter defined', async () => {
    const fieldId = 'name';
    delete form.model.fields.name.parser;
    let error;
      try {
        await testAction(form, Actions.CHANGE_VALUE, { formId: form.model.id, fieldId, value: 'Formatted Monica' });
      } catch (err) {
        error = err;
      }
      expect(error.code).toEqual(errors.MISSING_FORMATTER_OR_PARSER.code);
  });

  it('change name value - only parser defined', async () => {
    const fieldId = 'name';
    delete form.model.fields.name.formatter;
    let error;
      try {
        await testAction(form, Actions.CHANGE_VALUE, { formId: form.model.id, fieldId, value: 'Formatted Monica' });
      } catch (err) {
        error = err;
      }
      expect(error.code).toEqual(errors.MISSING_FORMATTER_OR_PARSER.code);
  });

  it('change name value - cause circular dependencies', async () => {
    delete form.model.fields.name.formatter;
    delete form.model.fields.lastName.formatter;
    delete form.model.fields.name.parser;
    delete form.model.fields.lastName.parser;
    form.model.fields.name.dependencies = ['lastName'];
    form.model.fields.name.dependenciesChange = { name: 'myDependenciesChange' };
    form.model.fields.lastName.dependencies = ['name'];
    form.model.fields.lastName.dependenciesChange = { name: 'myDependenciesChange' };
    form.resources.dependenciesChanges = {
      myDependenciesChange: {
        func: ({ value }) => ({ value: value + 1 }),
      },
    };
    const orgError = log.error;
    let error;
    log.error = (err) => { error = err; };
    const fieldId = 'name';
    const value = 12;
    const tracks = await testAction(form, Actions.CHANGE_VALUE, { formId: form.model.id, fieldId, value });

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_VALUE, // name
      Steps.ADD_ACTION,
      Steps.START_PROCESSING,
      Steps.START_ACTION,
      Steps.SET_FIELD_VALUE, // name
      Steps.SET_FIELD_VALUE, // lastName
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_COMPONENT_VALUE, // name
      Steps.SET_FIELD_VALUE, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_VALUE, // lastName
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_COMPONENT_VALUE, // name
      Steps.SET_FIELD_VALUE, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_VALUE, // lastName
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_COMPONENT_VALUE, // name
      Steps.SET_FIELD_VALUE, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_VALUE, // lastName
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.END_ACTION,
      Steps.SHIFT_ACTION,
      Steps.END_PROCESSING,
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_VALUE, // name - set component value (view value)
      Steps.START_PROCESSING, // start form processing
      Steps.SET_FIELD_COMPONENT_VALUE,
      Steps.SET_FIELD_COMPONENT_VALUE,
      Steps.SET_FIELD_COMPONENT_VALUE,
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    expect(finalForm.model.pendingActions).toEqual([]);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, fieldId, value, [{ fieldId, value }], expect.any(Function),
      expect.any(Array))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    beforeModel.fields.name.component.value = 12; // not actually before - because of the debounce
  
    // verify error
    expect(error.code).toEqual(errors.ACTION_FAILED.code);
    expect(error.subError.code).toEqual(errors.MAX_CIRCULAR_DEPENDENCIES_LOOPS.code);
    log.error = orgError;

    expect(finalForm.resources.hooks.beforeChangeValue).toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterChangeValue).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterAction).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeDataChange) .toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterDataChange).not.toHaveBeenCalled();
  });

  it('change name value - cause circular dependencies - same value', async () => {
    delete form.model.fields.name.component;
    delete form.model.fields.name.formatter;
    delete form.model.fields.lastName.formatter;
    delete form.model.fields.name.parser;
    delete form.model.fields.lastName.parser;
    delete form.model.data;
    form.model.fields.name.dependencies = ['lastName'];
    form.model.fields.name.dependenciesChange = { name: 'nameDependenciesChange' };
    form.model.fields.lastName.dependencies = ['name'];
    form.model.fields.lastName.dependenciesChange = { name: 'lastNameDependenciesChange' };
    form.resources.dependenciesChanges = {
      nameDependenciesChange: {
        func: ({ value }) => ({ value: 2 }),
      },
      lastNameDependenciesChange: {
        func: ({ value }) => ({ value: 3}),
      },
    };
    const orgError = log.error;
    let error;
    log.error = (err) => { error = err; };
    const fieldId = 'name';
    const value = 1;
    const tracks = await testAction(form, Actions.CHANGE_VALUE, { formId: form.model.id, fieldId, value });

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.ADD_ACTION, // add action to queue - changeValue
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // name - change value
      Steps.SET_FIELD_VALUE, // name
      Steps.SET_FIELD_VALUE, // lastName
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_VALUE, // name
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_EVALUATION, // name
      Steps.END_ACTION, // name - end change value
      Steps.SHIFT_ACTION, // pop the first action in the queue - changeValue
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.START_PROCESSING, // start form processing
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    expect(finalForm.model.pendingActions).toEqual([]);

    // verify error
    expect(error.code).toEqual(errors.ACTION_FAILED.code);
    expect(error.subError.code).toEqual(errors.CIRCULAR_DEPENDENCIES.code);
    log.error = orgError;

    // verify hooks
    expect(finalForm.resources.hooks.beforeChangeValue).toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterChangeValue).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterAction).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeDataChange) .toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterDataChange).not.toHaveBeenCalled();
  });

  it('handle 2 actions with debounce and resolve both - ok', async () => {
    const fieldId = 'name';
    const value1 = 'Formatted Ross';
    const value2 = 'Formatted Ben';
    const actions = [
      { type: Actions.CHANGE_VALUE, data: { formId: form.model.id, fieldId, value: value1 } },
      { type: Actions.CHANGE_VALUE, data: { formId: form.model.id, fieldId, value: value2 } },
    ];

    const tracks = await testActions(form, actions);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_VALUE, // name - Ross
      Steps.SET_FIELD_COMPONENT_VALUE, // name - Ben
      Steps.ADD_ACTION, // add process to queue - Ross
      Steps.START_PROCESSING, // start form processing - Ben
      Steps.START_ACTION, // name - Ben
      Steps.SET_FIELD_VALUE, // name - Ben
      Steps.SET_FIELD_EVALUATION, // name - Ben (excluded, disabled and errors)
      Steps.SET_FIELD_EVALUATION, // last name (excluded, disabled and errors)
      Steps.SET_FORM_EVALUATION, // when finish field + dependant fields - form evaluation (form.invalid + form.dirty)
      Steps.END_ACTION, // name - Ben - end change state
      Steps.SHIFT_ACTION, // pop the first process in the queue - changeState
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_VALUE, // name - Ross
      Steps.SET_FIELD_COMPONENT_VALUE, // name - Ben
      Steps.START_PROCESSING, // start form processing
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;

    // verify field new value
    expect(finalModel.fields.name.component.value).toEqual(value2);
    expect(finalModel.data.name).toEqual('Ben');
    expect(finalModel.pendingActions).toEqual([]);
  });

  function checkFieldEvaluation(field, excluded, disabled, errors, dirty, required, empty) {
    expect(field.excluded).toEqual(excluded);
    expect(field.disabled).toEqual(disabled);
    expect(field.errors).toEqual(errors);
    expect(field.dirty).toEqual(dirty);
    expect(field.required).toEqual(required);
    expect(field.empty).toEqual(empty);
  }
});
