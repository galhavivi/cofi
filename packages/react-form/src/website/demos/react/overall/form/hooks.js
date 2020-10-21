import { Actions } from '@cofi/form';

const localStorageKey = 'cofi-overall-form';

const saveFormToLocalStorage = ({ model, type }) => {
  if (type !== Actions.DESTROY) {
    localStorage.setItem(localStorageKey, JSON.stringify(model));
  }
};

const validate = ({ data }) => { // can be sync / async
  const valid = (data.name || '') !== 'Joey';
  return valid ? undefined : {
    name: [{ name: 'unique', message: 'Doesn\'t share food!' }],
  };
};

export default {
  afterAction: saveFormToLocalStorage, // after each action - save form model to the local storage
  validate, 
};
