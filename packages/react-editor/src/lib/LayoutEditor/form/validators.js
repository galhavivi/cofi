/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  uniqueId: {
    func: ({ value, context }) => {
      return !context.otherLayoutIds.includes(value);
    },
    message: () => 'Id already exists for this form',
  },
};
