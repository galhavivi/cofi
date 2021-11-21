/**
  * Copyright 2021, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';
import InternalTextField from '@mui/material/TextField';
 
export const TextField = styled(InternalTextField)`
   width: 100%;
   input {
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
  TextField,
};
