/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiRadioGroup from '@mui/material/RadioGroup';

/**
 * Represent a single select of any value
 * 
 * Import <a target="_blank" 
 href="https://github.com/galhavivi/cofi/blob/master/packages/react-components/src/components/edit/RadioGroup/RadioGroup.jsx">
 RadioGroup</a> from '@cofi/react-components/edit/RadioGroup'
 */
export default class RadioGroup extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    state: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        disabled: PropTypes.bool,
      })).isRequired,
      inline: PropTypes.bool,
    }),
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
    state: {
      items: [],
      inline: false,
    },
    disabled: false,
  };

  render() {
    return (
      <MuiRadioGroup value={this.props.value} onChange={this.onChange} row={this.props.state.inline}>
        {this.props.state.items.map((item) => {
          return (
            <FormControlLabel
              key={item.value} value={item.value} label={item.label} 
              disabled={this.props.disabled || item.disabled} control={<Radio />}
            />);
        })}
      </MuiRadioGroup>
    );
  }

  onChange = (e) => {
    this.props.onValueChange(e.target.value);
  };
}
