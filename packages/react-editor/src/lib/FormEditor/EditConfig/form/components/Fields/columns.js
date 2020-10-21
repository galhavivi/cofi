/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Boolean from '@cofi/react-components/view/Boolean';
import * as Styled from './Styled';

export default ({ setEditing }) => [{
  label: 'Id',
  content: ({ id, field }) => (<Styled.FieldLink onClick={() => setEditing({ id, field })}>{id}</Styled.FieldLink>),
}, {
  label: 'Label',
  content: ({ field }) => field.label,
}, {
  label: 'Referenced',
  content: ({ field }) => <Styled.BooleanWrapper><Boolean value={!!field._referenced} /></Styled.BooleanWrapper>,
}];
