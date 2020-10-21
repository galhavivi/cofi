/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Component',
  description: 'Reflects the UI component',
  path: 'component',
  component: {
    name: 'Handler',
    state: {
      argsName: 'state',
      addArgsLabel: 'Add initial state',
      options: [], // added dynamically
    },
  },
  validators: ['customNameRequired'],
};
