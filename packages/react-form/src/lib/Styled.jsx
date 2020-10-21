/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

export const Field = styled.div`
  margin: 0 40px 40px 0;

  > [aria-label="Header"] {
    margin: 0 0 10px 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.4;

    [aria-label="Label"] {
      display: inline-block;
      text-transform: uppercase;
      vertical-align: text-top;
      color: #989697;
    }

    [aria-label="Required"] {
      margin-left: 3px;
      display: inline-block;
      color: #989697;
    }

    [aria-label="Description"] {
      color: white;
      cursor: pointer;
      margin-left: 10px;
      background: #656364;
      padding: 1px 5px 1px 2px;
      border-radius: 10px;
      font-size: 10px;
    }
  }

  > [aria-label="Error"] {
    margin-top: 10px;
    font-size: 13px;
    color: #3a3a3a;
  }

  &[data-invalid="true"] {
    [aria-label="Label"], [aria-label="Required"], > [aria-label="Error"] {
      color: #e04336;
    }
  }

  &[data-disabled="true"] {
    [aria-label="Label"], [aria-label="Required"], > [aria-label="Error"] {
      color: #cccccc;
    }
  }

  ${({ styleOverrides = '' }) => styleOverrides}
`;
