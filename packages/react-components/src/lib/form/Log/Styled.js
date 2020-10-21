/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import styled from 'styled-components';
import MuiTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export const Tooltip = withStyles(() => ({
  tooltip: {
    fontSize: 13,
  },
}))(MuiTooltip);

export const Log = styled.div`
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  max-height: 360px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  cursor: default;
`;

export const Header = styled.div`
  display: flex;
  gap: 12px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const HeaderActions = styled.div`
  display: flex;
  flex: 1;
  gap: 12px;
  justify-content: flex-end;
  button {
    font-size: 12px;
    padding: 0;
    min-width: unset;
  }
`;

export const Tab = styled.div`
  cursor: pointer;
  font-weight: ${({ selected }) => selected ? 'bold' : 'normal'};
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  gap: 10px;
`;

export const Items = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Item = styled.div`
  cursor: pointer;
`;

export const NoMessages = styled.div`
  flex: 1;
  text-align: center;
  margin: auto;
  color: #e5e5e5;
  font-size: 18px;
  svg {
    width: 70px;
    height: 70px;
  }
`;
