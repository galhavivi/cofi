/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';
import MUIList from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';

const List = styled(MUIList)`
  width: 100%;
  background-color: #fff;
  [id="/overview/introduction"] {
    display: none;
  }
  [role="button"].Mui-selected {
    color: #3fcee6;
    background: unset;
  }
`;

const ListItem = styled(MUIListItem)`
  padding-left: ${props => `${props.level * 20}px !important`};
`;

export default {
  List,
  ListItem,
};
