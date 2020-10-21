/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import createHandler from './createHandler';

export default {
  label: 'Custom Terms',
  description: `Add custom terms, that are not part of the app's / Cofi's common terms`,
  path: 'resources.terms',
  component: {
    name: 'DynamicItemsModal',
    state: { 
      resourceId: 'termForm',
      addModalTitle: 'Add Term',
      editModalTitle: 'Edit Term',
    },
  },
  formatter: { name: 'handlerFormatter' },
  parser: { name: 'handlerParser' },
};

export const termForm = createHandler({
  funcDescription: 'Returns true if pass term, otherwise - false',
  defaultArgsDescription: 'Default args for all fields. This will be shallow merged with field level term '
    + 'args before passed to the func',
  data: {
    defaultArgs: {},
    func: `function (props) {
  // props = { id, value, dependencies { id: { value } }, args, context }
  
  // return true if pass term, otherwise - false
  return true;
}`,
  },
});
