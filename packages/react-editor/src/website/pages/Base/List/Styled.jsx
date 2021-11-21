/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';
import { withTheme } from '@mui/styles';

export const Wrapper = styled.div`
  padding: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-weight: 500;
`;

export const BooleanWrapper = styled.div`
  position: relative;
  top: 7px;
`;

export const Link = withTheme(styled.a`
  flex: 1;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.palette.secondary.main};
  &:hover {
    text-decoration: underline;
  }
`);
