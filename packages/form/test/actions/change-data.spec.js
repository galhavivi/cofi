/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction } from '../../src/actions/test-utils';
import { Steps, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-data';

describe('actions / changeData', () => {
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

  it('action steps', async () => {
    const data = { name: 'Monica', lastName: 'Geller' };
    const tracks = await testAction(form, Actions.CHANGE_DATA, { formId: form.model.id, data });

    // see that all expected steps occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.ADD_ACTION, // add action to queue - changeDate
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // start - change form data
      Steps.SET_FORM_DATA, // set form data
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { mock: 1 }
      Steps.SET_FIELD_COMPONENT_PREV_STATE, // name
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_EVALUATION, // lastName (dependent on name)
      Steps.SET_FORM_EVALUATION, // after finish init all fields - form evaluation
      Steps.END_ACTION, // end - change form data
      Steps.SHIFT_ACTION, // pop the first action in the queue - changeData
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.START_PROCESSING, // start form processing
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { mock: 1 }
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify new data
    expect(finalForm.model.data).toEqual(data);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, data, expect.any(Function))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const actionData = { formId: form.model.id, data };
    const beforeProps = {
      model: beforeModel, resources: form.resources, data: actionData, type: Actions.CHANGE_DATA,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, data: actionData, type: Actions.CHANGE_DATA,
    };
    const toDtoProps = {
      data,
    };

    expect(finalForm.resources.hooks.toDto).toHaveBeenCalledWith(toDtoProps);
    expect(finalForm.resources.hooks.beforeChangeData).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeData).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeDataChange).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterDataChange).toHaveBeenCalledWith(afterProps);
  });
});
