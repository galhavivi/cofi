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
import { render, act, fireEvent } from '@testing-library/react';
import { LogProvider, LogContext } from '../lib';

describe('LogProvider', () => {
  let settings;
  let component;
  const InnerComponent = () => <div data-testid="mock-children" />;
  const children = <InnerComponent />;
 
  // Setup mock
  beforeEach(() => {
    settings = {
      debugMaxLength: 1,
      errorMaxLength: 1,
      warnMaxLength: 1,
      formIds: [],
    };

    LogContext.Provider = jest.fn(({ children, value }) => (<div>
      <button data-testid="clear-log" onClick={() => value.clear()} />
      <div>{children}</div>
    </div>));
  });

  it('render and behave ok', async () => {
    // render ok
    await act(async () => { component = render(<LogProvider settings={settings}>{children}</LogProvider>); });
    expect((component.getByTestId('mock-children'))).not.toBeNull();
    expect(LogContext.Provider).toHaveBeenCalledWith({
      children,
      value: {
        settings,
        history: { debug: [], warn: [], error: [] },
        clear: expect.any(Function),
      },
    }, {});

    // logger adds records to debug, warm and error
    const debugRecord = { step: { type: 'mock' } };
    await act(async () => {
      logger.debug(debugRecord);
      logger.warn('warn-1');
      logger.error('error-1');
      logger.error('error-2'); // errors max length is 1
      // jest.runAllTimers();
    });
 
    // verify history include new items
    expect(LogContext.Provider).toHaveBeenCalledWith({
      children,
      value: {
        settings,
        history: { debug: [debugRecord], warn: ['warn-1'], error: ['error-2'] },
        clear: expect.any(Function),
      },
    }, {});

    // clear the history
    fireEvent.click(component.getByTestId('clear-log'));

    // verify history is empty
    expect(LogContext.Provider).toHaveBeenCalledWith({
      children,
      value: {
        settings,
        history: { debug: [], warn: [], error: [] },
        clear: expect.any(Function),
      },
    }, {});
  });

  it('render and log only settings.formIds', async () => {
    // render ok
    settings = {
      debugMaxLength: 2,
      errorMaxLength: 2,
      warnMaxLength: 2,
      formIds: ['employee'],
    };
    await act(async () => { component = render(<LogProvider settings={settings}>{children}</LogProvider>); });
    expect((component.getByTestId('mock-children'))).not.toBeNull();
    expect(LogContext.Provider).toHaveBeenCalledWith({
      children,
      value: {
        settings,
        history: { debug: [], warn: [], error: [] },
        clear: expect.any(Function),
      },
    }, {});

    // add record to debug, warm and error - of the filtered form
    let form = { model: { id: 'employee' } };
    const debugRecord = { step: { type: 'mock' }, form };
    const warnRecord = { form };
    const errorRecord = { form };
    await act(async () => {  
      logger.debug(debugRecord);
      logger.warn(warnRecord);
      logger.error(errorRecord);
    });

    // add record to debug, warm and error - of a form that is not in the formIds
    form = { model: { id: 'order' } };
    const debugRecord2 = { step: { type: 'mock' }, form };
    const warnRecord2 = { form };
    const errorRecord2 = { form };
    await act(async () => {
      logger.debug(debugRecord2);
      logger.warn(warnRecord2);
      logger.error(errorRecord2);
    });

    // verify history
    expect(LogContext.Provider).toHaveBeenCalledWith({
      children,
      value: {
        settings,
        history: { debug: [debugRecord], warn: [warnRecord], error: [errorRecord] },
        clear: expect.any(Function),
      },
    }, {});

    // clear the history
    fireEvent.click(component.getByTestId('clear-log'));

    // verify history is empty
    expect(LogContext.Provider).toHaveBeenCalledWith({
      children,
      value: {
        settings,
        history: { debug: [], warn: [], error: [] },
        clear: expect.any(Function),
      },
    }, {});
  });

  it('render without settings - uses the default settings', async () => {
    settings = {
      debugMaxLength: 50,
      errorMaxLength: 10,
      warnMaxLength: 10,
      formIds: [],
    };
    await act(async () => { component = render(<LogProvider>{children}</LogProvider>); });
    expect((component.getByTestId('mock-children'))).not.toBeNull();
    expect(LogContext.Provider).toHaveBeenCalledWith({
      children,
      value: {
        settings,
        history: { debug: [], warn: [], error: [] },
        clear: expect.any(Function),
      },
    }, {});
  });
});
