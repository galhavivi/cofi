/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import * as ReactAll from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { withLog } from '../lib';
  
  
describe('withLog', () => {
  let context;
  let CofiLog;
  let realUseContext;
  
  // Setup mock
  beforeEach(() => {
    context = {
      debug: [],
      error: [],
      warn: [],
    };
    realUseContext = ReactAll.useContext;
    ReactAll.useContext = () => context;
    const Log = () => {};
    CofiLog = withLog(Log);
  });

  // Cleanup mock
  afterEach(() => {
    ReactAll.useContext = realUseContext;
  });

  it('rendered correctly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<CofiLog mickey="mouse" />);
    const element = renderer.getRenderOutput();
    expect(element.props).toEqual({
      log: context,
      mickey: 'mouse',
    });
  });
});
