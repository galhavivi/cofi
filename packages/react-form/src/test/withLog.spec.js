/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { render, act } from '@testing-library/react';
import { withLog, LogContext } from '../lib';
  
  
describe('withLog', () => {
  let context;
  let CofiLog;
  let Log;
  let wrapper;
  
  beforeEach(() => {
    context = {
      debug: [],
      error: [],
      warn: [],
    };
    Log = jest.fn(() => <div />);
    CofiLog = withLog(Log);
    wrapper = ({ children }) => (<LogContext.Provider value={context}>{children}</LogContext.Provider>);
  });

  it('rendered correctly', async () => {
    await act(async () => { render(<CofiLog mickey="mouse" />, { wrapper }); });
    expect(Log).toHaveBeenCalledWith({
      log: context,
      mickey: 'mouse',
    }, {});
  });
});
