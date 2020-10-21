/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Id',
  description: 'Unique layout ID',
  path: 'id',
  required: true,
  component: {
    name: 'TextInput',
  },
  context: ['otherLayoutIds'],
  validators: [{ name: 'uniqueId' }],
};
