/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import { createForm } from '../lib';

describe('createForm', () => {
  const model = {
    id: 'simpleForm',
    fields: {
      name: { path: 'name', component: 'inputText' },
    },
    data: { name: 'rachel' },
  };

  const resources = {
    inputText: jest.fn(),
  };
  const settings = {};
  it('render ok', () => {
    const MockComponent = props => <button>{props.label}</button>;
    const Form = createForm({ model, resources, settings })(MockComponent);
    const component = shallow(<Form label="Bla" />);
    expect(component).toMatchSnapshot();
  });
});
