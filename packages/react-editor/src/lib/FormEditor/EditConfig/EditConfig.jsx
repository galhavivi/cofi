/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { withForm } from '@cofi/react-form';
import BaseItem from '../../BaseItem';
import sections from './sections';
import * as Styled from './Styled';

export default withForm(({ onSave, onCancel, form }) => (<Styled.EditConfigWrapper aria-label="Edit Config">
  { form.model.context.edit && <Styled.Blocker aria-label="Blocker" /> }
  <BaseItem
    size={1}
    sections={sections}
    onSave={onSave}
    onCancel={onCancel} />
</Styled.EditConfigWrapper>));
