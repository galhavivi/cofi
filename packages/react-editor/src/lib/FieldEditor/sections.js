/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { Field } from '@cofi/react-form';

const styleOverrides = `
  flex-basis: 400px;
  margin: 0;
  
  [aria-label="Label"], [aria-label="Required"], [aria-label="Error"] {
    color: orange;
  }
`;

const StyledField = (props) => (<Field styleOverrides={styleOverrides} { ...props } />);

const boxes = (fieldIds) => ([{
  style: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '900px',
    gap: '40px 70px',
    marginBottom: '40px',
  },
  boxes: fieldIds.map(id => ({ component: StyledField, props: { id } })),
}]);


export default [{
  id: 'basic',
  title: 'Basic',
  boxes: boxes(['id', 'path', 'label', 'context', 'dependencies', 'dependenciesChange']),
}, {
  id: 'validations',
  title: 'Validations',
  boxes: boxes(['required', 'validators']),
}, {
  id: 'terms',
  title: 'Terms',
  boxes: boxes(['excludeTerm', 'disableTerm', 'requireTerm']),
}, {
  id: 'ui',
  title: 'UI',
  boxes: boxes(['label', 'description', 'component', 'formatter', 'parser']),
}];
