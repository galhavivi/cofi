/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Switch from '../../lib/edit/Switch/index.js';
import { mapper } from '../../lib/edit/Switch/Switch';

describe('Switch', () => {
  let componentProps;

  const cofiProps = {
    value: true,
    disabled: true,
    onValueChange: jest.fn(),
  };

  const expectedProps = {
    checked: true,
    disabled: true,
    onChange: expect.any(Function),
  };
 
  beforeEach(() => {
    componentProps = mapper(cofiProps);
  });

  describe('mapper', () => {
    it('return correct props', () => {
      expect(componentProps).toEqual(expectedProps);
    });
  
    it('call onValueChange with correct value', () => {
      const mockEvent = { target: { checked: false } };
      componentProps.onChange(mockEvent);
      expect(cofiProps.onValueChange).toHaveBeenCalledWith(false);
    });
  });

  describe('component', () => {
    it('renders ok', () => {
      const component = shallow(<Switch {...cofiProps} />);
      expect(component.props()).toEqual(expectedProps);
    });
  });
});
