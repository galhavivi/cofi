/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import createHandler from './createHandler';

export default {
  label: 'Custom Validators',
  description: `Add custom validators, that are not part of the app's / Cofi's common validators`,
  path: 'resources.validators',
  component: {
    name: 'DynamicItemsModal',
    state: { 
      resourceId: 'validatorForm',
      addModalTitle: 'Add Validator',
      editModalTitle: 'Edit Validator',
    },
  },
  formatter: { name: 'handlerFormatter' },
  parser: { name: 'handlerParser' },
};

export const validatorForm = createHandler({
  funcDescription: 'Returns true for valid, otherwise return false',
  messageDescription: 'Returns a string error message in case the validation function returns invalid.',
  defaultArgsDescription: 'Default args for all fields. This will be shallow merged with field level validator '
    + 'args before passed to the func / message',
  data: {
    defaultArgs: {},
    func: `function (props) {
  // props = { id, value, dependencies { id: { value } }, args, context }
  
  // return true for valid, otherwise return false
  return true;
}`,
    message: `function (props) {
  // props = { id, value, label, dependencies { id: { value, label } }, args, context }
  
  // return error message
  return 'Field invalid';
}`,
  },
});
