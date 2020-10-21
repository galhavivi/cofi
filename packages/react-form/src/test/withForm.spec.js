/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import * as ReactAll from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { withForm } from '../lib';
  
  
describe('withForm', () => {
  let context;
  let Form;
  let realUseContext;
  
  // Setup mock
  beforeEach(() => {
    context = {
      model: {},
      resources: {},
      actions: {},
    };
    realUseContext = ReactAll.useContext;
    ReactAll.useContext = () => context;
    const Inner = () => {};
    Form = withForm(Inner);
  });

  // Cleanup mock
  afterEach(() => {
    ReactAll.useContext = realUseContext;
  });

  it('rendered correctly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Form mickey="mouse" />);
    const element = renderer.getRenderOutput();
    expect(element.props).toEqual({
      form: context,
      mickey: 'mouse',
    });
  });
});
