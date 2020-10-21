/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import styled from 'styled-components';

const Element = styled.div`${props => props.styled}`;

const Box = ({ style, boxes = [], component: Component, props = {} }) => {
  const elementProps = typeof style === 'string' ? { styled: style } : { style };

  return Component 
    ? (<Component {...props} />) 
    : (<Element {...elementProps}>{boxes.map((box, index) => (<Box key={index} {...box} />))}</Element>);
};

export default Box;
