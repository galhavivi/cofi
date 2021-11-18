/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';
import { withTheme } from '@mui/styles';

export const BooleanWrapper = styled.div`
  position: relative;
  top: 7px;
`;

export const FieldLink = withTheme(styled.a`
  flex: 1;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.palette.secondary.main};
  &:hover {
    text-decoration: underline;
  }
`);

export const GridWrapper = styled.div`
  max-height: 400px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ComponentWrapper = styled.div`
  width: 400px;
  margin: 0 0 20px 0;
`;
