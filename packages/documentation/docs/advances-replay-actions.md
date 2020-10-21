---
id: replay
title: Replay Actions
sidebar_label: Replay Actions
---

Cofi's Form [hooks](hooks.html) exposes `afterAction` hook among others. Using this hook that gets args of the current form model and 
action information - one can store the form's history of actions in order to log user actions. Later the actions history can be used to
 automatically run the user's actions history in-order to track and debug reported bugs.

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