/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Input from '@material-ui/core/Input';
import { toCofi } from '../../lib/utils//index';


describe('toCofi', () => {
  const mapper = ({ value, state, disabled, onValueChange }) => ({
    type: state.type,
    placeholder: state.placeholder,
    value,
    disabled,
    onChange: event => onValueChange(event.target.checked),
  });

  const mockCofiProps = {
    value: 'Rachel Green',
    disabled: true,
    state: {
      type: 'text',
      placeholder: 'Enter name...',
    },
    onValueChange: jest.fn(),
  };

  const expectedInputProps = {
    type: mockCofiProps.state.type,
    placeholder: mockCofiProps.state.placeholder,
    value: mockCofiProps.value,
    disabled: mockCofiProps.disabled,
    onChange: expect.any(Function),
  };

  it('should return correct component', () => {
    const CofiInput = toCofi(Input, mapper);
    const rendered = shallow(<CofiInput {...mockCofiProps} />);
    expect(rendered.props()).toEqual(expectedInputProps);
  });
});
 
