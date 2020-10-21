/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

export const Details = styled.div`
  border-left: 1px solid #e5e5e5;
  padding-left: 10px;
  flex: 1;
  flex-basis: 40%;
  display: flex;
  width: 0;
  flex-direction: column;
`;

export const Close = styled(CloseIcon)`
  cursor: pointer;
  font-size: 14;
`;

export const Header = styled.div`
  display: flex;
`;

export const Body = styled.div`
  flex: 1;
  overflow: auto;
`;

export const Title = styled.div`
  flex: 1;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Type = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
