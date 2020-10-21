/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import AsyncSelect from '../../lib/edit/AsyncSelect';
import { mapper } from '../../lib/edit/AsyncSelect/AsyncSelect';
  
describe('AsyncSelect', () => {
  let componentProps;
  
  const cofiProps = {
    value: { value: 'ocean', label: 'Ocean' },
    disabled: false,
    required: false,
    state: { 
      placeholder: 'Color...',
      searchQuery: 'oc',
      isLoading: false,
      items:[
        { value: 'ocean', label: 'Ocean' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
      ],
    },
    onValueChange: jest.fn(),
    onStateChange: jest.fn(),
  };
  

  const expectedProps = {
    value: { value: 'ocean', label: 'Ocean' },
    options: cofiProps.state.items,
    placeholder: 'Color...',
    isDisabled: false,
    isClearable: true,
    isSearchable: true,
    isLoading: false,
    inputValue: 'oc',
    styles: expect.any(Object),
    onChange: expect.any(Function),
    onInputChange: expect.any(Function),
  };
   
  beforeEach(() => {
    componentProps = mapper(cofiProps);
  });
  
  describe('mapper', () => {
    it('return correct props', () => {
      expect(componentProps).toEqual(expectedProps);
      Object.keys(expectedProps).forEach(key => {
        expect(componentProps[key]).toEqual(expectedProps[key]);
      });
    });
    
    it('onChange - call onValueChange with correct value', () => {
      const selected = expectedProps.options[1];
      componentProps.onChange([selected]);
      expect(cofiProps.onValueChange).toHaveBeenCalledWith([cofiProps.state.items[1]]);
    });
 
    it('onChange - call onValueChange with undefined value', () => {
      componentProps.onChange(undefined);
      expect(cofiProps.onValueChange).toHaveBeenCalledWith(undefined);
    });
 
    it('onInputChange - call onStateChange with correct value', () => {
      componentProps.onInputChange('ra');
      expect(cofiProps.onStateChange).toHaveBeenCalledWith(expect.any(Function));
      const updater = cofiProps.onStateChange.mock.calls[0][0];
      expect(updater({ state: { items: [] } })).toEqual({ items: [], searchQuery: 'ra' });
    });
  });
  
  describe('component', () => {
    it('renders ok', () => {
      const component = shallow(<AsyncSelect {...cofiProps} />);
      expect(component.props()).toMatchObject(expectedProps);
    });
  });
});
