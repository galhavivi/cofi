---
id: undo-redo
title: Undo & Redo
sidebar_label: Undo & Redo
---

Cofi's Form [hooks](hooks.html) exposes [afterAction](hooks#afteraction) hook among others. 
Use this hook that gets args such as the current form model (entire form snapshot) and action information - to store the actions history. A form revert to its previous state can be done by either one of the following options:
- Init Form again with previous form model
- Store the form actions and perform and opposite actions on demand. For example if previous field value was `a` and now it changed to `b` using
the change value action - then it can be reverted by calling change value again with the previous value `a`.

Same approach goes for redo operation.

### Example 

 ```javascript
 import MyLocalStorageService from './local-storage-service.js';

const model = {
  // ...
};

const resources = {
  // ...
  hooks: {
    afterAction: ({ model, data, type }) => {
      const storageKey = `${model.id}-history`;
      
      // get actions history from local storage
      const actionsHistory = MyLocalStorageService.get(storageKey);

      // add action
      actionsHistory.push({ model, data, type });

      // set actions history to local storage
      MyLocalStorageService.set(storageKey, actionsHistory);
    },
  },
};
 ```