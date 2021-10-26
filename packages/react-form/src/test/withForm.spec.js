/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { render, act } from '@testing-library/react';
import { withForm, FormContext } from '../lib';
  

describe('withForm', () => {
  let context;
  let Form;
  let Inner;
  let wrapper;

  beforeEach(() => {
    context = {
      model: {},
      resources: {},
      actions: {},
    };

    Inner = jest.fn(() => <div />);
    Form = withForm(Inner);
    wrapper = ({ children }) => (<FormContext.Provider value={context}>{children}</FormContext.Provider>);
  });
 
  it('rendered correctly', async () => {
    await act(async () => { render(<Form mickey="mouse" />, { wrapper }); });
    expect(Inner).toHaveBeenCalledWith({
      form: context,
      mickey: 'mouse',
    }, {});
  });
});
