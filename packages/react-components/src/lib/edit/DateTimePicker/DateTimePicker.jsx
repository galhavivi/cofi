/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { DateTimePicker as InternalDateTimePicker } from '@mui/lab';
import PropTypes from 'prop-types';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


/**
 * Represent a Date object
 * 
 * Import <a target="_blank" href=
 "https://github.com/galhavivi/cofi/blob/master/packages/react-components/src/components/edit/DateTimePicker/DateTimePicker.jsx">
 DateTimePicker</a> from '@cofi/react-components/edit/DateTimePicker'
 */
export default class DateTimePicker extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    state: PropTypes.shape({
      format: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null, // fixes underline controlled VS uncontrolled issue when value turns to undefined
    state: {
      format: 'MM/dd/yyyy hh:mm',
    },
    disabled: false,
    invalid: false,
  };
 
  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <InternalDateTimePicker
          renderInput={(props) => <TextField {...props} />}
          value={this.props.value}
          format={this.props.state.format || DateTimePicker.defaultProps.state.format}
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
