/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import TrueIcon from '@mui/icons-material/CheckCircleOutline';
import FalseIcon from '@mui/icons-material/NotInterested';
import Styled from './StyledComponents';

/**
 * Represent a boolean value
 * 
 * Import <a target="_blank" 
 href="https://github.com/galhavivi/cofi/blob/master/packages/react-components/src/components/view/Boolean/Boolean.jsx">
 Boolean</a> from '@cofi/react-components/view/Boolean'
 */
export default class Boolean extends React.Component {
  static propTypes = {
    value: PropTypes.bool,
  };

  static defaultProps = {
    value: false,
  };

  render() {
    const Icon = this.props.value ? TrueIcon : FalseIcon;
    const color = this.props.value ? '#1adc91' : '#989697';

    return (<Styled.Icon color={color}><Icon /></Styled.Icon>);
  }
}
