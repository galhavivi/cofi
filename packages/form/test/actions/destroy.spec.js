/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction } from '../../src/actions/test-utils';
import { Steps, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/destroy';


describe('actions / destroy', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeDestroy: jest.fn(),
      afterDestroy: jest.fn(),
    });
  });

  it('action steps', async () => {
    const tracks = await testAction(form, Actions.DESTROY, { formId: form.model.id });

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.ADD_ACTION, // add action to queue - destroy
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // start destroy form
      Steps.REMOVE_FORM, // remove form
      Steps.END_ACTION, // end destroy form
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.START_PROCESSING, // start form processing
      Steps.END_PROCESSING, // end form processing
    ]);

    expect(tracks.privateForm[tracks.privateForm.length - 1].form).toEqual(undefined);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, expect.any(Function))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = undefined;
    const data = { formId: form.model.id };
    const beforeProps = {
 model: beforeModel, resources: form.resources, data, type: Actions.DESTROY,
};
    const afterProps = {
 model: afterModel, resources: undefined, data, type: Actions.DESTROY,
};

    expect(form.resources.hooks.beforeDestroy).toHaveBeenCalledWith(beforeProps);
    expect(form.resources.hooks.afterDestroy).toHaveBeenCalledWith(afterProps);
    expect(form.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(form.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
  });
});
