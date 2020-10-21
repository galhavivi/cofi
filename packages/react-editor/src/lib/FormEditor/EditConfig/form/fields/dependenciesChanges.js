/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import createHandler from './createHandler';

export default {
  label: 'Custom Dependencies Changes',
  description: `Add custom dependencies changes, that are not part of the app's / Cofi's common dependencies changes`,
  path: 'resources.dependenciesChanges',
  component: {
    name: 'DynamicItemsModal',
    state: { 
      resourceId: 'dependenciesChangeForm',
      addModalTitle: 'Add Dependency Change',
      editModalTitle: 'Edit Dependency Change',
    },
  },
  formatter: { name: 'handlerFormatter' },
  parser: { name: 'handlerParser' },
};

export const dependenciesChangeForm = createHandler({
  funcDescription: 'Evaluates on each field’s dependencies value change. Return object with new value / state / both / '
    + 'undefined for no change',
  defaultArgsDescription: 'Default args for all fields. This will be shallow merged with field level dependency change '
    + 'args before passed to the func',
  data: {
    defaultArgs: {},
    func: `function (props) {
  // props = { id, value, state, dependencies { id: { value } }, prevDependencies { id: { value } }, args, context }
  
  // return object with new value / state / both - for a change, or undefined for no change.
  return undefined;
}`,
  },
});
