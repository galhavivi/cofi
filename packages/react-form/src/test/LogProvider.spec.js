/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

let logger;
jest.mock('@cofi/form', () => {
  return {
    setLogger: (name, x) => logger = x,
    Steps: {
      END_PROCESSING: 'END_PROCESSING',
    },
  };
});

import React from 'react';
import * as ReactAll from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { LogProvider, LogContext } from '../lib';

// TODO: should update test to use "act" like Form.spec.js instead of manual mock for useEffect / useState.
describe('LogProvider', () => {
  let settings;
  const Component = () => {};
  const children = <Component />;
  let realUseEffect;
  let realUseState;
  let ready;
  let history;
  let call;
  let effect;
 
  jest.useFakeTimers();

  function setMocks() {
    // mock useEffect
    ReactAll.useEffect = (func) => effect = func;

    // mock useState
    call = 0;
    ReactAll.useState = (value) => {
      // first render
      if (call === 0) { // useState of ready
        call++;
        ready = value;
        return [ready, x => ready = x];
      } else if (call === 1) { // useState of history
        call++;
        history = value;
        return [history, x => history = x];
      }
      // 2, 3, 4 renders
      if ([2, 4, 6].includes(call)) { // useState of ready
        call++;
        return [ready, x => ready = x];
      } else if ([3, 5, 7].includes(call)) { // useState of history
        call++;
        return [history, x => history = x];
      }
    };    
  }

  function render(renderer, s) {
    renderer.render(<LogProvider settings={s}>{children}</LogProvider>);
    return renderer.getRenderOutput();
  }

  function verifyRender(element, debug = [], warn = [], error = []) {
    expect(element.type).toEqual(LogContext.Provider);
    expect(element.props).toEqual({
      children,
      value: {
        settings,
        history: {
          debug,
          warn,
          error,
        },
        clear: expect.any(Function),
      },
    });
  }

  function renderAndVerify(renderer, s, debug, warn, error) {
    // render
    const element = render(renderer, s);
  
    // verify render result
    verifyRender(element, debug, warn, error);

    return element;
  }

  // Setup mock
  beforeEach(() => {
    settings = {
      debugMaxLength: 1,
      errorMaxLength: 1,
      warnMaxLength: 1,
      formIds: [],
    };

    // backup
    realUseEffect = ReactAll.useEffect;
    realUseState = ReactAll.useState;

    setMocks();
  });

  // Cleanup mocks
  afterEach(() => {
    ReactAll.useEffect = realUseEffect;
    ReactAll.useState = realUseState;
  });

  it('render and behave ok', () => {
    const renderer = new ShallowRenderer();

    // first render
    let element = render(renderer, settings);

    // first render
    expect(element).toEqual(null);

    // mock call to useEffect
    const cleanup = effect();

    // verify use effect result
    expect(ready).toBeTruthy();
    expect(logger).toBeTruthy();

    // second render
    renderAndVerify(renderer, settings);

    // add record to debug, warm and error
    const debugRecord = { step: { type: 'mock' } };
    logger.debug(debugRecord);
    logger.warn('warn-1');
    logger.error('error-1');
    logger.error('error-2'); // errors max length is 1
    jest.runAllTimers();

    // verify render - that history history passed
    element = renderAndVerify(renderer, settings, [debugRecord], ['warn-1'], ['error-2']);

    // clear the history
    element.props.value.clear();
    
    // verify render - that history history empty
    renderAndVerify(renderer, settings);

    // cleanup
    cleanup();
  });

  it('render and log only settings.formIds', () => {
    const renderer = new ShallowRenderer();

    // first render
    settings = {
      debugMaxLength: 2,
      errorMaxLength: 2,
      warnMaxLength: 2,
      formIds: ['employee'],
    };
    let element = render(renderer, settings);

    // first render
    expect(element).toEqual(null);

    // mock call to useEffect
    const cleanup = effect();

    // verify use effect result
    expect(ready).toBeTruthy();
    expect(logger).toBeTruthy();

    // second render
    renderAndVerify(renderer, settings);

    // add record to debug, warm and error - of the filtered form
    let form = { model: { id: 'employee' } };
    const debugRecord = { step: { type: 'mock' }, form };
    const warnRecord = { form };
    const errorRecord = { form };
    logger.debug(debugRecord);
    logger.warn(warnRecord);
    logger.error(errorRecord);

    // add record to debug, warm and error - of a form that is not in the formIds
    form = { model: { id: 'order' } };
    const debugRecord2 = { step: { type: 'mock' }, form };
    const warnRecord2 = { form };
    const errorRecord2 = { form };
    logger.debug(debugRecord2);
    logger.warn(warnRecord2);
    logger.error(errorRecord2);

    jest.runAllTimers();

    // verify render - that history history passed
    element = renderAndVerify(renderer, settings, [debugRecord], [warnRecord], [errorRecord]);

    // clear the history
    element.props.value.clear();
    
    // verify render - that history history empty
    renderAndVerify(renderer, settings);

    // cleanup
    cleanup();
  });

  it('render without settings - uses the default settings', () => {
    const renderer = new ShallowRenderer();

    // first render
    let element = render(renderer);
    
    // first render
    expect(element).toEqual(null);

    // mock call useEffect
    const cleanup = effect();

    // verify use effect result
    expect(ready).toBeTruthy();
    expect(logger).toBeTruthy();

    // second render
    element = render(renderer);

    // verify render result with default settings
    settings = {
      debugMaxLength: 50,
      errorMaxLength: 10,
      warnMaxLength: 10,
      formIds: [],
    };
    verifyRender(element);

    // cleanup
    cleanup();
  });
});
