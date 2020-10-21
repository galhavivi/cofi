
/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction } from '../../src/actions/test-utils';
import { Steps, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-ui';

describe('actions / changeUi', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeChangeUi: jest.fn(),
      afterChangeUi: jest.fn(),
    });
    form.resources.components.mockComponent = {
      renderer: () => {},
    };    
  });

  it('changeUi - ok', async () => {
    const fieldId = 'name';
    const label = 'a';
    const description = 'b';
    const component = { name: 'mockComponent' };
    const expectedComponent = { 
      name: 'mockComponent', 
      value: 'formatter2-Rachel',
      state: {},
      modelState: {},
      prevState: undefined,
      prevValue: undefined,
      ready: true,
    };
    const formatter = { name: 'formatter2' };
    const parser = { name: 'parser2' };
    const ui = { label, description, component, formatter, parser };
    form.resources.conversions = {
      formatter2: { func: ({ value }) => `formatter2-${value}` },
      parser2: { func: ({ value }) => value.replace('formatter2-', '') },
    };

    const tracks = await testAction(form, Actions.CHANGE_UI, { formId: form.model.id, fieldId, ui });
    expect(tracks.privateForm).toHaveLength(8);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    expect(finalForm.model.fields.name.component).toEqual(expectedComponent);
    expect(finalForm.model.fields.name.formatter).toEqual(formatter);
    expect(finalForm.model.fields.name.parser).toEqual(parser);
    expect(finalForm.model.fields.name.label).toEqual(label);
    expect(finalForm.model.fields.name.description).toEqual(description);
    
    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, fieldId, ui, expect.any(Function))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const data = { formId: form.model.id, fieldId, ui };
    const beforeProps = {
      model: beforeModel, resources: form.resources, data, type: Actions.CHANGE_UI,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, data, type: Actions.CHANGE_UI,
    };

    expect(finalForm.resources.hooks.beforeChangeUi)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeUi)
      .toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction)
      .toHaveBeenCalledWith(afterProps);
  });

  it('changeUi - with undefined ui - ok', async () => {
    const fieldId = 'lastName';
    const ui = undefined;
  
    const tracks = await testAction(form, Actions.CHANGE_UI, { formId: form.model.id, fieldId, ui });
    expect(tracks.privateForm).toHaveLength(7);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    
    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, fieldId, {}, expect.any(Function))];
    pendingActions.forEach(action => action.id = expect.any(String));
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const data = { formId: form.model.id, fieldId, ui: {} };
    const beforeProps = {
      model: beforeModel, resources: form.resources, data, type: Actions.CHANGE_UI,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, data, type: Actions.CHANGE_UI,
    };

    expect(finalForm.resources.hooks.beforeChangeUi)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeUi)
      .toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction)
      .toHaveBeenCalledWith(afterProps);
  });

  it('action steps', async () => {
    const component = { name: 'mockComponent' };
    const ui = { component };
    const tracks = await testAction(form, Actions.CHANGE_UI, { formId: form.model.id, fieldId: 'name', ui });

    // see that all expected actions
    expect(tracks.privateForm.map(x => x.step.type)).toEqual([
      Steps.ADD_ACTION, // add action to queue - changeUi
      Steps.START_PROCESSING, // start form processing
      Steps.START_ACTION, // start change field component
      Steps.SET_FIELD_UI, // change field component
      Steps.SET_FIELD_COMPONENT_VALUE, // change field component value
      Steps.END_ACTION, // end change field component
      Steps.SHIFT_ACTION, // pop the first action in the queue - changeUi
      Steps.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.step.type)).toEqual([
      Steps.START_PROCESSING, // start form processing
      Steps.SET_FIELD_COMPONENT_VALUE, // change field component value
      Steps.END_PROCESSING, // end form processing
    ]);
  });
});
