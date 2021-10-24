/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * Represent a string value
 * 
 * Import <a target="_blank" 
 href="https://github.com/galhavivi/cofi/blob/master/packages/react-components/src/components/edit/Text/Text.jsx">
 Text</a> from '@cofi/react-components/edit/Text'
 */
export default class Text extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    state: PropTypes.shape({
      placeholder: PropTypes.string,
      multiline: PropTypes.bool,
      maxRows: PropTypes.number,
      maxLength: PropTypes.number,
    }),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
    state: {
      placeholder: '',
      multiline: false,
      maxRows: undefined,
      maxLength: undefined,
    },
    disabled: false,
    invalid: false,
  };

  render() {
    return (
      <FormControl>
        <Input
          type="text"
          value={this.props.value}
          placeholder={this.props.state.placeholder}
          disabled={this.props.disabled}
          multiline={this.props.state.multiline}
          maxRows={this.props.state.maxRows}
          error={this.props.invalid}
          onChange={this.onValueChange}
          inputProps={{
            maxLength: this.props.state.maxLength,
          }} />
        { this.props.state.maxLength === undefined ? null :
          <FormHelperText>{this.props.value.length} / {this.props.state.maxLength}</FormHelperText> }
      </FormControl>
    );
  }

  onValueChange = (e) => {
    this.props.onValueChange(e.target.value);
  }
}
