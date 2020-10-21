/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { create, act } from 'react-test-renderer';
import * as JForm from '@cofi/form';
import { Form } from '../lib';

describe('Form', () => {
  const children = <div>Mock Child</div>;
  let props;
  let mocks;
  let mocksInvalid;
  let root;

  beforeEach(() => {
    props = { 
      model: { id: 'mockId' }, 
      settings: { maxSomething: 23 },
      resources: { validators: {} },
    };

    mocks = {
      init: jest.fn(() => true), // init finish ok
      changeValue: jest.fn(),
      changeState: jest.fn(),
      changeUi: jest.fn(),
      changeData: jest.fn(),
      changeContext: jest.fn(),
      destroy: jest.fn(),
    };

    mocksInvalid = {
      init: jest.fn(() => undefined), // init finish not ok
    };

    JForm.default.prototype.init = mocks.init;
    JForm.default.prototype.changeValue = mocks.changeValue;
    JForm.default.prototype.changeState = mocks.changeState;
    JForm.default.prototype.changeUi = mocks.changeUi;
    JForm.default.prototype.changeData = mocks.changeData;
    JForm.default.prototype.changeContext = mocks.changeContext;
    JForm.default.prototype.destroy = mocks.destroy;
  });

  const init = async () => {
    // creates the form, and triggers first useEffect
    await act(async () => { root = await create(<Form {...props}>{children}</Form>); });

    // verify form render
    expect(root.toJSON()).toEqual(null);

    // verify calls
    expect(mocks.init).toHaveBeenCalledWith(props.model, props.resources, props.settings, expect.any(Function));
    expect(mocks.destroy).not.toHaveBeenCalled();
    expect(mocks.changeData).not.toHaveBeenCalled();
    expect(mocks.changeContext).not.toHaveBeenCalled();
  };
  
  it('init - triggers init action and update public ui form', async () => { 
    // init and verify
    await init();

    // mock update public form when init finish
    const updatePublicForm = mocks.init.mock.calls[0][3];
    const form = { model: props.model, settings: props.settings, resources: props.resources };
    act(() => { updatePublicForm(form); });
    
    // verify form render
    expect(root.toJSON()).toMatchSnapshot();

    // verify all correct data passed from the context value
    // TODO
  });

  it('init - with app context prop', async () => { 
    props.context = { a: 1 };
    const expectedModel = Object.assign({}, props.model, { context: props.context });

    // creates the form, and triggers first useEffect
    await act(async () => { root = await create(<Form {...props}>{children}</Form>); });

    // verify form render
    expect(root.toJSON()).toEqual(null);

    // verify calls
    expect(mocks.init).toHaveBeenCalledWith(expectedModel, props.resources, props.settings, expect.any(Function));
    expect(mocks.destroy).not.toHaveBeenCalled();
    expect(mocks.changeData).not.toHaveBeenCalled();
    expect(mocks.changeContext).not.toHaveBeenCalled();
  });

  it('change model prop - triggers destroy if needed and init actions', async () => {
    // init and verify
    await init();

    // change model prop to invalid model - triggers destroy & init actions
    JForm.default.prototype.init = mocksInvalid.init; // init finish not ok
    props.model = {};
    await act(async () => { await root.update(<Form {...props}>{children}</Form>); });
    expect(mocks.destroy.mock.calls).toHaveLength(1);
    expect(mocksInvalid.init.mock.calls).toHaveLength(1);
    expect(mocksInvalid.init.mock.calls[0]).toEqual([props.model, props.resources, props.settings, expect.any(Function)]);
    expect(mocks.init.mock.calls).toHaveLength(1); // from last time
    expect(mocks.changeContext.mock.calls).toHaveLength(0); // from last time
    expect(mocks.changeData.mock.calls).toHaveLength(0); // from last time

    // change model prop to a valid model - triggers only init action (skip destroy since last init was not a success)
    JForm.default.prototype.init = mocks.init; // init finish ok
    props.model = { id: 'test', fields: { a: { path: 'a' } } };
    await act(async () => { await root.update(<Form {...props}>{children}</Form>); });
    expect(mocks.destroy.mock.calls).toHaveLength(1); // from last time
    expect(mocksInvalid.init.mock.calls).toHaveLength(1); // from last time
    expect(mocks.init.mock.calls).toHaveLength(2);
    expect(mocks.init.mock.calls[1]).toEqual([props.model, props.resources, props.settings, expect.any(Function)]);
    expect(mocks.changeContext.mock.calls).toHaveLength(0); // from last time
    expect(mocks.changeData.mock.calls).toHaveLength(0); // from last time

    // change model prop to valid model again - triggers destroy & init actions
    props.model = { id: 'test2', fields: { b: { path: 'b' } } };
    await act(async () => { await root.update(<Form {...props}>{children}</Form>); });
    expect(mocks.destroy.mock.calls).toHaveLength(2);
    expect(mocksInvalid.init.mock.calls).toHaveLength(1); // from last time
    expect(mocks.init.mock.calls).toHaveLength(3);
    expect(mocks.init.mock.calls[2]).toEqual([props.model, props.resources, props.settings, expect.any(Function)]);
    expect(mocks.changeContext.mock.calls).toHaveLength(0); // from last time
    expect(mocks.changeData.mock.calls).toHaveLength(0); // from last time
  });

  it('change model prop - few times, while first change not done yet', async () => {
    // init and verify
    await init();

    const model2 = { id: 'test2', fields: { b: { path: 'b' } } };
    const model3 = { id: 'test2', fields: { b: { path: 'c' } } };

    // change model prop triggers destroy & init actions
    await act(async () => {
      props.model = model2;
      await root.update(<Form {...props}>{children}</Form>);

      props.model = model3;
      await root.update(<Form {...props}>{children}</Form>); 
    });
    expect(mocks.destroy.mock.calls).toHaveLength(2);
    expect(mocks.init.mock.calls).toHaveLength(3);
    expect(mocks.init.mock.calls[1]).toEqual([model2, props.resources, props.settings, expect.any(Function)]);
    expect(mocks.init.mock.calls[2]).toEqual([model3, props.resources, props.settings, expect.any(Function)]);
    expect(mocks.changeContext.mock.calls).toHaveLength(0);
    expect(mocks.changeData.mock.calls).toHaveLength(0);
    expect(mocksInvalid.init.mock.calls).toHaveLength(0);
  });

  it('change data prop - triggers changeData action', async () => {
    // init and verify
    await init();

    // change data prop - triggers changeData action
    props.data = { a: 1 };
    await act(async () => { await root.update(<Form {...props}>{children}</Form>); });
    expect(mocks.changeData).toHaveBeenCalledWith(props.data);
    expect(mocks.init.mock.calls).toHaveLength(1); // from last time
    expect(mocks.changeContext.mock.calls).toHaveLength(0); // from last time
    expect(mocks.destroy.mock.calls).toHaveLength(0); // from last time
  });

  it('change context prop - triggers changeContext action', async () => {
    // init and verify
    await init();

    // change context prop - triggers changeContext action
    props.context = { a: 1 };
    await act(async () => { await root.update(<Form {...props}>{children}</Form>); });
    expect(mocks.changeContext).toHaveBeenCalledWith(props.context);
    expect(mocks.init.mock.calls).toHaveLength(1); // from last time
    expect(mocks.changeData.mock.calls).toHaveLength(0); // from last time
    expect(mocks.destroy.mock.calls).toHaveLength(0); // from last time
  });

  it('unmount - triggers destroy action and stops receiving UI updates to the public form', async () => {
    // init and verify
    await init();

    // unmount
    await act(async () => { await root.unmount(); });

    // verify only destroy action called
    expect(mocks.destroy.mock.calls).toHaveLength(1);
    expect(mocks.init.mock.calls).toHaveLength(1); // from last time
    expect(mocks.changeData.mock.calls).toHaveLength(0); // from last time
    expect(mocks.changeContext.mock.calls).toHaveLength(0); // from last time

    // verify stops getting ui updates (the internal form triggers another ui updates such as DESTROY - END_PROCESSING
    // after the component un-mounted - and causing set state to unmounted component - which throws error)
    const updatePublicForm = mocks.init.mock.calls[0][3];
    const form = { model: undefined, settings: props.settings, resources: props.resources };
    const orgError = global.console.error;
    global.console.error = jest.fn();

    act(() => { updatePublicForm(form); });
    expect(global.console.error).not.toHaveBeenCalled();

    global.console.error = orgError;
  });

  it('unmount - after bad model init - not triggers destroy action and stops receiving UI updates to the public form',
    async () => {
    // init and verify
      await init();

      // change model prop to invalid model - triggers destroy & init actions
      JForm.default.prototype.init = mocksInvalid.init; // init finish not ok
      props.model = {};
      await act(async () => { await root.update(<Form {...props}>{children}</Form>); });
      expect(mocks.destroy.mock.calls).toHaveLength(1);
      expect(mocksInvalid.init.mock.calls).toHaveLength(1);
      expect(mocksInvalid.init.mock.calls[0]).toEqual([props.model, props.resources, props.settings, expect.any(Function)]);
      expect(mocks.init.mock.calls).toHaveLength(1); // from last time
      expect(mocks.changeContext.mock.calls).toHaveLength(0); // from last time
      expect(mocks.changeData.mock.calls).toHaveLength(0); // from last time

      // unmount
      await act(async () => { await root.unmount(); });

      // verify destroy action not called
      expect(mocks.destroy.mock.calls).toHaveLength(1); // from last time
      expect(mocks.init.mock.calls).toHaveLength(1); // from last time
      expect(mocks.changeData.mock.calls).toHaveLength(0); // from last time
      expect(mocks.changeContext.mock.calls).toHaveLength(0); // from last time

      // verify stops getting ui updates (the internal form triggers another ui updates such as DESTROY - END_PROCESSING
      // after the component un-mounted - and causing set state to unmounted component - which throws error)
      const updatePublicForm = mocks.init.mock.calls[0][3];
      const form = { model: undefined, settings: props.settings, resources: props.resources };
      const orgError = global.console.error;
      global.console.error = jest.fn();

      act(() => { updatePublicForm(form); });
      expect(global.console.error).not.toHaveBeenCalled();

      global.console.error = orgError;
    });
});
