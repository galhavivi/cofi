/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

export const Row = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  > div {
    flex: 1;
  }
`;

export const JsonViewWrapper = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  max-width: 500px;
  border-left: 1px solid #e1e1e1;
  background-color: rgb(252, 253, 253);
`;
