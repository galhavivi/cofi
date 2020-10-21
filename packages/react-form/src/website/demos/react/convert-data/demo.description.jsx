/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P>Use hooks of 'toDto' and 'fromDto' to convert data structure 
  from your app to Cofi and from Cofi back to your app. In this demo server data has a field of 'content' which is
  an array that contains all content types (netflix and hbo), whereas cofi form data has 2 separate fields of 
  netflix content and hbo content using the 'fromDto' and 'toDto' hooks to convert data
</Styled.P>);
