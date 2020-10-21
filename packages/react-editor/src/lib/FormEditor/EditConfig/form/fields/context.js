/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'App Context',
  description: `App data that the fields might depend on during the form's lifecycle`,
  path: 'model.context',
  component: {
    name: 'JsonEditor',
    state: {
      height: '200px',
    },
  },
};
