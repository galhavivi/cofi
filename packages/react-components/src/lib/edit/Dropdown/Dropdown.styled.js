/**
  * Copyright 2021, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';
import Select from '@mui/material/Select';

export const Dropdown = styled(Select)`
  width: 100%;
  [role="button"] {
    padding-top: 5px;
    padding-bottom: 4px;
    padding-left: 0;
  }
  fieldset {
    border-radius: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
  }
`;

export default {
  Dropdown,
};
