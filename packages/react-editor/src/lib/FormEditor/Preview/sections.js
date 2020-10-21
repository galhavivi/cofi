/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Field } from '@cofi/react-form';

export const getGrid = ({ templateAreas }) => {
  let fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
  fieldIds = [...(new Set(fieldIds))];
  return {
    templateAreas,
    templateColumns: 'minmax(0, 1fr)',
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component: Field, 
      props: { id },
    })),
  };
};
