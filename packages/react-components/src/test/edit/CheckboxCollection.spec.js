/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import CheckboxCollection from '../../lib/edit/CheckboxCollection';
import { mapper } from '../../lib/edit/CheckboxCollection/CheckboxCollection';
  
describe('CheckboxCollection', () => {
  let componentProps;
  
  const cofiProps = {
    value: ['ocean'],
    disabled: true,
    state: {
      search: { value: 'oc' },
      inline: true,
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
    value: cofiProps.value,
    disabled: cofiProps.disabled,
    items: cofiProps.state.items,
    search: cofiProps.state.search,
    inline: cofiProps.state.inline,
    onChange: expect.any(Function),
    onSearchChange: expect.any(Function),
  };
   
  beforeEach(() => {
    componentProps = mapper(cofiProps);
  });
  
  describe('mapper', () => {
    it('return correct props', () => {
      expect(componentProps).toEqual(expectedProps);
    });
    
    it('onChange - call onValueChange with correct value', () => {
      const selected = [expectedProps.items[1].value];
      componentProps.onChange(selected);
      expect(cofiProps.onValueChange).toHaveBeenCalledWith(selected);
    });
 
    it('onChange - call onValueChange with undefined value', () => {
      componentProps.onChange(undefined);
      expect(cofiProps.onValueChange).toHaveBeenCalledWith(undefined);
    });
 
    it('onSearchChange - call onStateChange with correct value', () => {
      componentProps.onSearchChange('ra');
      expect(cofiProps.onStateChange).toHaveBeenCalledWith(expect.any(Function));
      const updater = cofiProps.onStateChange.mock.calls[0][0];
      expect(updater({ state: { items: [] } })).toEqual({ items: [], search: { value: 'ra' } });
    });
  });
  
  describe('component', () => {
    it('renders ok', () => {
      const component = shallow(<CheckboxCollection {...cofiProps} />);
      expect(component.props()).toMatchObject(expectedProps);
    });
  });
});
 
