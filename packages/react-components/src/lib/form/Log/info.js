/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Actions, Steps } from '@cofi/form';

export default {
  title: `Cofi logs are available in the console's error, warn and debug (verbose) tabs. 
    Debug records are shown in the console by default when NODE_ENV = 'development'. Log level can be controlled and changed.`,
  duration: `Action duration in milliseconds from 'START_ACTION' - 'END_ACTION'.
    Reflects only Cofi's class Form actions duration, without the UI renders duration.`,
  uiUpdate: `UI renders are triggered during the form lifecycle - only when necessary. START_PROCESSING and END_PROCESSING are
    important to show / hide loading or disable / enable submit button. SET_FIELD_COMPONENT_VALUE (sets view value for 
    controlled components) and SET_FIELD_COMPONENT_STATE are important to show immediate UI response while Cofi's Form 
    is executing the action asynchronously`,
  actions: {
    [Actions.INIT]: 'Init the form instance with a model, resources and settings objects.',
    [Actions.CHANGE_VALUE]: `Change a field's value to a new value. New value will be placed in the form's data object according 
      to the field's path.`,
    [Actions.CHANGE_DATA]: `Change form's data object to a new object.`,
    [Actions.CHANGE_CONTEXT]: `Change form's context object to a new object.`,
    [Actions.CHANGE_STATE]: `Change a field's state object to a new object.`,
    [Actions.CHANGE_UI]: `Change a field's UI definitions.`,
    [Actions.SUBMIT]: `Submit the form using the form's 'model.data'.`,
    [Actions.DESTROY]: 'Destroys the form.',
  },
  steps: {
    [Steps.ADD_ACTION]: 'Add action to the end of the queue.',
    [Steps.START_PROCESSING]: `Start processing queue's pending actions - FIFO.`,
    [Steps.END_PROCESSING]:  `End processing queue's pending actions.`,
    [Steps.START_ACTION]: 'Start processing an action.',
    [Steps.END_ACTION]: 'End processing an action.',
    [Steps.SHIFT_ACTION]: 'Remove processed action from the queue.',
    [Steps.SET_FORM]: 'Set form snapshot to the store.',
    [Steps.REMOVE_FORM]: 'Remove form from the store.',
    [Steps.SET_FORM_EVALUATION]: 'Set calculated indicators to the form',
    [Steps.SET_FORM_INITIALIZED_DATA]: 'Set calculated data after init to the form',
    [Steps.SET_FORM_DATA]: 'Set data to the form',
    [Steps.SET_FORM_CONTEXT]: 'Set context to the form',
    [Steps.SET_FORM_ERRORS]: 'Set form errors to the form',
    [Steps.SET_FIELDS_ERRORS]: 'Set errors to a field in the form',
    [Steps.SET_FIELD_COMPONENT_VALUE]: `Set view value to a field in the form (under 'model.fields[i].component').`,
    [Steps.SET_FIELD_COMPONENT_VALUE_BATCH]: `Set view value to fields in the form (under 'model.fields[i].component').`,
    [Steps.SET_FIELD_VALUE]: `Set data value to a field in the form (under 'model.data' according to the field's path).`,
    [Steps.SET_FIELD_EVALUATION]: 'Set calculated indicators to a field in the form',
    [Steps.SET_FIELD_COMPONENT_STATE]: `Set component state to a field in the form (under 'model.fields[i].component').`,
    [Steps.SET_FIELD_COMPONENT_PREV_STATE]: `Set component previous state to a field in the form 
      (under 'model.fields[i].component').`,
    [Steps.SET_FIELD_UI]: 'Set UI options to a field in the form',
  },
};
