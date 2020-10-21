/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction, testActions } from '../../src/actions/test-utils';
import { Steps, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-state';

describe('actions / changeState', () => {
  let form;

  beforeEach(() => {
    form = cloneDeep(formMock);

    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeChangeState: jest.fn(),
      afterChangeState: jest.fn(),
    });
  });

  it('action steps', async () => {
    const fieldId = 'name';
    const state = { loading: true };
    const tracks = await testAction(form, Actions.CHANGE_STATE, { formId: form.model.id, fieldId, state });

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { isLoading: true }
      Steps.ADD_ACTION, // add process to queue - changeState
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // name - change state
      Steps.SET_FIELD_COMPONENT_PREV_STATE, // name - prevState = {}
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { isLoading: false }
      Steps.SET_FIELD_COMPONENT_PREV_STATE, // name - prevState = { isLoading: true }
      Steps.END_ACTION, // name - end change state
      Steps.SHIFT_ACTION, // pop the first process in the queue - changeState
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { isLoading: true }
      Steps.START_PROCESSING, // start form processing
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { isLoading: false }
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify field new state (after recursive set states happened
    const state2 = { loading: false };
    expect(finalForm.model.fields.name.component.state).toEqual(state2);
    expect(finalForm.model.fields.name.component.modelState).toEqual(state2);
    expect(finalForm.model.fields.name.component.prevState).toEqual(state);
    expect(finalForm.model.pendingActions).toEqual([]);

    // verify hooks
    const stateChangesStates = [state, state2];
    const pendingActions = [createPendingAction(form.model.id, fieldId, state, stateChangesStates, expect.any(Function),
      expect.any(Array))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    beforeModel.fields.name.component.state = state; // not actually before, because of the debounce
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const data = { formId: form.model.id, fieldId, state };
    const beforeProps = {
 model: beforeModel, resources: form.resources, data, type: Actions.CHANGE_STATE,
};
    const afterProps = {
 model: afterModel, resources: form.resources, data, type: Actions.CHANGE_STATE,
};

    expect(finalForm.resources.hooks.beforeChangeState)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeState)
      .toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction)
      .toHaveBeenCalledWith(afterProps);
  });

  it('handle 2 actions with debounce and resolve both - ok', async () => {
    const fieldId = 'name';
    form.resources.components.inputText.stateChange = jest.fn();
    const initialState = { pageNumber: 0 };
    form.model.fields[fieldId].component.state = initialState;
    form.model.fields[fieldId].component.modelState = initialState;
    const state1 = { pageNumber: 1 };
    const state2 = { pageNumber: 2 };
    const actions = [
      { type: Actions.CHANGE_STATE, data: { formId: form.model.id, fieldId, state: state1 } },
      { type: Actions.CHANGE_STATE, data: { formId: form.model.id, fieldId, state: state2 } },
    ];

    const tracks = await testActions(form, actions);

    expect(form.resources.components.inputText.stateChange.mock.calls).toEqual([
      [{
        id: fieldId,
        value: 'Rachel',
        dependencies: {},
        componentValue: undefined,
        state: state2,
        prevValue: undefined,
        prevDependencies: undefined,
        prevComponentValue: undefined,
        prevState: initialState,
        context: {},
      }],
    ]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { pageNumber: 1 }
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { pageNumber: 2 }
      Steps.ADD_ACTION, // add process to queue - changeState
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // name - change state
      Steps.SET_FIELD_COMPONENT_PREV_STATE, // name - prevState = { pageNumber: 0 }
      Steps.END_ACTION, // name - end change state
      Steps.SHIFT_ACTION, // pop the first process in the queue - changeState
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { pageNumber: 1 }
      Steps.SET_FIELD_COMPONENT_STATE, // name - state = { pageNumber: 2 }
      Steps.START_PROCESSING, // start form processing
      Steps.END_PROCESSING, // end form processing
    ]);

    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;

    // verify field new state (after recursive set states happened)
    expect(finalModel.fields.name.component.state).toEqual({ pageNumber: 2 });
    expect(finalModel.fields.name.component.modelState).toEqual({ pageNumber: 2 });
    expect(finalModel.fields.name.component.prevState).toEqual({ pageNumber: 0 });
    expect(finalModel.pendingActions).toEqual([]);
  });
});
