/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const itemViewSizeCache = {};

export default (size, hasTabs) => {
  const key = `${size},${hasTabs}`;
  if (!itemViewSizeCache[key]) {
    itemViewSizeCache[key] = {
      Wrapper: styled.div`
        color: #3d3d3d;
        background-color: #fff;
        height:100%;
        display: flex;
        flex-direction: column;
      `,
      Header: styled.div`
        flex: 0 0 auto;
        padding: 0 ${() => (size * 10) + 10}px;
        border-bottom: 3px solid #e1e1e1;
        position: relative;
        min-height: 48px;
        position: relative;
      `,
      
      Title: styled.div`
        font-size: ${() => ((size * 2) + 20)}px;
        font-weight: 500;
        margin: 0;
        padding: ${() => (hasTabs ? '25px 0 10px 0' : '25px 0')};
      `,
      Row: styled.div`
        display: flex;
        flex-direction: row;
      `,
      TabsWrapper: styled.div`
        flex: 1;
        position: relative;
        top: 3px;
        left: -10px;
      `,
      Sections: styled.div`
        flex-grow: 1;
        overflow-y: auto;
      `,
      Footer: styled.div`
        flex: 0 0 auto;
        display: flex;
        direction: row;
        background: hsla(0,0%,99%,.9);
        opacity: 1;
        padding: ${() => (size * 2) + 10}px ${() => (size * 10) + 10}px;
        box-shadow: 0 -3px 3px 0 hsla(0,0%,75%,.5);
        z-index: 20;
        pointer-events: auto;
      `,
      Buttons: styled.div`
        display: flex;
        direction: row;
        flex-grow: 1;
        justify-content: flex-end;
      `,
      ButtonWrapper: styled.div`
        margin-left: 15px;
      `,
    };
  }
  return itemViewSizeCache[key];
};
