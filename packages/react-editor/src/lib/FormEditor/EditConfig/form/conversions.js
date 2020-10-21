/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  handlerFormatter: ({ value = {} }) => {
    return Object.keys(value).map(name => ({ 
      name,
      func: value[name].func,
      defaultArgs: value[name].defaultArgs,
      message: value[name].message,
      renderer: value[name].renderer,
      stateChange: value[name].stateChange,
    }));
  },
  handlerParser: ({ value = [] }) => {
    const newValue = {};
    value.forEach(x => {
      const handler = {};
      if (x.func) {
        handler.func = x.func;
      }
      if (x.defaultArgs) {
        handler.defaultArgs = x.defaultArgs;
      }
      if (x.message) {
        handler.message = x.message;
      }
      if (x.renderer) {
        handler.renderer = x.renderer;
      }
      if (x.stateChange) {
        handler.stateChange = x.stateChange;
      }
      newValue[x.name] = handler;
    });
    return newValue;
  },
};
