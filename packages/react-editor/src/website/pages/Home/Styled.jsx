/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';
import { withTheme } from '@mui/styles';

export const Wrapper = styled.div`
  padding: 40px;
  margin: 0 auto;
  max-width: 700px;
  h1, h3 {
    font-weight: 300;
  }
`;

export const Link = withTheme(styled.a`
  flex: 1;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.palette.primary.main};
  &:hover {
    text-decoration: underline;
  }
`);

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px 0;
`;

export const Action = withTheme(styled.a`
  border: 1px solid ${props => props.theme.palette.primary.main};
  border-radius: 3px;
  color: ${props => props.theme.palette.primary.main};
  display: inline-block;
  font-weight: 400;
  padding: 10px;
  text-decoration: none!important;
  text-transform: uppercase;
  -webkit-transition: background .3s,color .3s;
  transition: background .3s,color .3s;
  width: 100%;
  text-align: center;
  margin-right: 20px;
  padding: 30px 0 50px 0;
  &:hover {
    text-decoration: none;
    cursor: pointer;
    background: ${props => props.theme.palette.primary.main};
    color: #ffffff;
  }
  svg {
    height: 40px;
    width: 40px;
    margin-bottom: 10px;
  }
`);
