
/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Boolean from '@cofi/react-components/view/Boolean';
import { BooleanWrapper, Link } from '../../Base/List/Styled';


export default ({ edit }) => [{
  label: 'Id',
  content: (form) => <Link onClick={() => edit(form)}>{form.model.id}</Link>,
}, {
  label: 'Fields',
  content: (form) => Object.keys(form.model.fields).length,
}, {
  label: 'Initial Data',
  content: (form) => <BooleanWrapper><Boolean value={!!form.model.data} /></BooleanWrapper>,
}, {
  label: 'Settings',
  content: (form) => <BooleanWrapper><Boolean value={!!form.settings} /></BooleanWrapper>,
}, {
  label: 'Layouts',
  content: (form) => <BooleanWrapper><Boolean value={!!form.layouts} /></BooleanWrapper>,
}];
