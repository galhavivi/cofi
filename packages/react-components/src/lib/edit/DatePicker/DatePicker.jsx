/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import PropTypes from 'prop-types';
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as InternalDatePicker } from '@mui/lab';
import Styled from './DatePicker.styled';

/**
 * Represent a Date object
 * 
 * Import <a target="_blank" 
 href="https://github.com/galhavivi/cofi/blob/master/packages/react-components/src/components/edit/DatePicker/DatePicker.jsx">
 DatePicker</a> from '@cofi/react-components/edit/DatePicker'
 */
export default class DatePicker extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    state: PropTypes.shape({
      format: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null, // fixes underline controlled VS uncontrolled issue when value turns to undefined
    state: {
      format: 'MM/dd/yyyy',
      placeholder: '',
    },
    disabled: false,
    invalid: false,
  };

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <InternalDatePicker
          renderInput={(props) => <Styled.TextField {...props} />}
          value={this.props.value}
          format={this.props.state.format || DatePicker.defaultProps.state.format}
          disabled={this.props.disabled}
          error={this.props.invalid}
          onChange={this.onChange}
        />
      </LocalizationProvider>
    );
  }

  onChange = (value) => {
    this.props.onValueChange(value);
  };
}
