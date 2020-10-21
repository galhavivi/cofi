/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import reducer from './reducer';
import log from './log';
import { UiSteps } from './actions/types';
import actions from './actions';

// getFormStore & setFormStore - represent object of { model, resources }
export default function handleAction(getFormStore, setFormStore) {
  return (type, data) => {
    // redux structure of getState & dispatch
    // will be useful if we implement cofi based on redux with single form to multi forms (and not form per instance)
    const getState = () => (!getFormStore() ? {
      forms: {},
    } : {
      forms: {
        [getFormStore().model.id]: getFormStore(),
      },
    });

    const dispatch = (obj, action) => {
      // if obj is function - execute it
      if (typeof obj === 'function') {
        return obj(dispatch, getState);
      }

      // else obj is step object - update the store using the reducer
      handleStep(obj, action)(getState, setFormStore);
    };

    return dispatch(actions[type](data));
  };
}

const handleStep = (step, action) => (getState, setFormStore) => {
  const { forms } = getState();
  const newForms = reducer(forms, step);
  const formId = Object.keys(newForms)[0];
  const newFormStore = newForms[formId];
  step.uiChange = UiSteps.includes(step.type);
  setFormStore(newFormStore, step);

  log.debug({ action, step, form: newFormStore });
};
