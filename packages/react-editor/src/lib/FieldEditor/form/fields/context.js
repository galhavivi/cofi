/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Context',
  description: `Array of context ids (which represent app data) that the current field is depended on at any time of the 
  field's evaluation`,
  path: 'context',
  context: ['contextIds'],
  component: {
    name: 'MultiSelect',
    state: {
      searchable: true,
      items: [],
    },
  },
};
