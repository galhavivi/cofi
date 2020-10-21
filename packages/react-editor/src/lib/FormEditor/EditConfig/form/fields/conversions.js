/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import createHandler from './createHandler';

export default {
  label: 'Custom Conversions',
  description: `Add custom conversions, that are not part of the app's / Cofi's common conversions`,
  path: 'resources.conversions',
  component: {
    name: 'DynamicItemsModal',
    state: { 
      resourceId: 'conversionForm',
      addModalTitle: 'Add Conversion',
      editModalTitle: 'Edit Conversion',
    },
  },
  formatter: { name: 'handlerFormatter' },
  parser: { name: 'handlerParser' },
};

export const conversionForm = createHandler({
  funcDescription: `When used by formatter - value is the data value (from model.data) and return value is the 
  formatted value (view value for component).
  When used by parser - value is the view value (from component) and return value is the parsed value (data value).`,
  defaultArgsDescription: 'Default args for all fields. This will be shallow merged with field level conversion '
    + 'args before passed to the func',
  data: {
    defaultArgs: {},
    func: `function (props) {
  // props = { id, value, state, dependencies { id: { value } }, args, context }
  
  // return new value
  return undefined;
}`,
  },
});
