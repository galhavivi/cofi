/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import handleAction from '../handle-action';

export async function testAction(initialStore, type, data) {
  const actions = [{ type, data }];
  const tracker = await testActions(initialStore, actions);
  return tracker;
}

export async function testActions(initialStore, actions) {
  // prepare tracker to the steps actions
  const tracker = { privateForm: [], publicForm: [] };

  // prepare handle action data
  let form = initialStore;
  const getFormStore = () => form;
  const setFormStore = (newStore, step) => {
    form = newStore;
    tracker.privateForm.push({ form, step });

    if (step.uiChange) {
      tracker.publicForm.push({ form, step });
    }
  };

  const promises = actions.map(action => handleAction(getFormStore, setFormStore)(action.type, action.data));
  await Promise.all(promises);
  return tracker;
}
