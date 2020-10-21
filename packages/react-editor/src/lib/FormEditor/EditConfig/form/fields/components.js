/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import createHandler from './createHandler';

export default {
  label: 'Custom Components',
  description: `Add custom components, that are not part of the app's common components`,
  path: 'resources.components',
  component: {
    name: 'DynamicItemsModal',
    state: { 
      resourceId: 'componentForm',
      addModalTitle: 'Add Component',
      editModalTitle: 'Edit Component',
    },
  },
  formatter: { name: 'handlerFormatter' },
  parser: { name: 'handlerParser' },
};

export const componentForm = createHandler({
  rendererDescription: 'Actual UI component.',
  stateChangeDescription: 'Triggers when state changes. Manage state changes outside of the ui component when using '
    + 'stateless component.',
  data: {
    renderer: `function (props) {
  // props = { value, state, disabled, dirty, empty, required, invalid, onValueChange, onStateChange }
  
  // custom component - implement after download form
  return "TODO";
}`,
    stateChange: `function (props) {
  /* props = { 
    id, 
    value, // data value
    dependencies, // { id: { value (data value) } } 
    componentValue, // view value
    state, 
    prevValue, 
    prevDependencies, // { id: { value (data value) } }
    prevComponentValue, // view value
    prevState,
    context,
  } */
  
  // return new state object or undefined
  return undefined;
}`,
  },
});
