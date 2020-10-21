/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

export const Action = styled.div`
  color: ${({ isQueueAction }) => isQueueAction ? '#9a9a9a' : 'unset'};
`;

export const ActionType = withTheme(styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, selected }) => selected ? theme.palette.primary.main : 'unset'};
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`);

export const ActionDuration = styled.div`
  margin-left: 8px;
  color: #0095ff;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Steps = styled.div`
  padding: 4px 8px 8px 0px;
`;

export const Step = styled.div`
  color: ${({ isQueueStep }) => isQueueStep ? '#9a9a9a' : 'unset'};
  display: flex;
  gap: 8px;
`;

export const StepType = withTheme(styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, selected }) => selected ? theme.palette.primary.main : 'unset'};
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`);

export const SpreadStep = styled(Step)`
  display: flex;
  gap: 10px;
  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    &:nth-child(1) {
      width: 30%;
      max-width: 100px;
    }
    &:nth-child(2) {
      width: 45%;
    }
    &:nth-child(3) {
      width: 67%;
      max-width: 80px;
    }
  }
`;

export const UIUpdate = styled.div`
  color: #ec44a8;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Header = styled.div`
  display: flex;
  margin: 8px 0;
`;
