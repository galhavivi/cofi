/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction } from '../../src/actions/test-utils';
import { Steps, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-context';

describe('actions / changeContext', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeChangeContext: jest.fn(),
      afterChangeContext: jest.fn(),
    });
  });

  it('action steps', async () => {
    const context = { userId: '888', companyId: '789' };

    const tracks = await testAction(form, Actions.CHANGE_CONTEXT, { formId: form.model.id, context });

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.ADD_ACTION, // add action to queue - changeDate
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // start - change form context
      Steps.SET_FORM_CONTEXT, // set form context
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Steps.SET_FIELD_EVALUATION, // name
      Steps.SET_FIELD_EVALUATION, // lastName
      Steps.SET_FIELD_EVALUATION, // lastName (dependent on name)
      Steps.SET_FORM_EVALUATION, // after finish init all fields - form evaluation
      Steps.END_ACTION, // end - change form context
      Steps.SHIFT_ACTION, // pop the first action in the queue - changeContext
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.START_PROCESSING, // start form processing
      Steps.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify new context
    expect(finalForm.model.context).toEqual(context);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, context, expect.any(Function))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const data = { formId: form.model.id, context };
    const beforeProps = {
 model: beforeModel, resources: form.resources, data, type: Actions.CHANGE_CONTEXT,
};
    const afterProps = {
 model: afterModel, resources: form.resources, data, type: Actions.CHANGE_CONTEXT,
};

    expect(finalForm.resources.hooks.beforeChangeContext).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeContext).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
  });
});
