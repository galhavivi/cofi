/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  > div:first-child {
    flex: 1;
    overflow: hidden;
  }
`;

export const LogWrapper = styled.div`
  border-top: 2px solid #e1e1e1;
  height: 300px;
  padding: 20px;
`;
