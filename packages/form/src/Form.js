/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { noop } from 'lodash';
import { Actions } from './actions/types';
import { throwError, errors } from './errors';
import handleAction from './handle-action';

const internal = Symbol('internal');
const external = Symbol('external');
const destroyed = Symbol('destroyed');


export default class Form {
  init(model, resources, settings, onUpdateForm = noop) {
    this[internal] = { model, resources, settings };
    this.onUpdateForm = onUpdateForm;

    return safe.call(this, () => exec.call(this,
      Actions.INIT, { model, resources, settings }));
  }

  changeValue(fieldId, value) {
    return safe.call(this, () => exec.call(this,
      Actions.CHANGE_VALUE, { formId: this[internal].model.id, fieldId, value }));
  }

  changeState(fieldId, state) {
    return safe.call(this, () => exec.call(this,
      Actions.CHANGE_STATE, { formId: this[internal].model.id, fieldId, state }));
  }

  changeData(data) {
    return safe.call(this, () => exec.call(this,
      Actions.CHANGE_DATA, { formId: this[internal].model.id, data }));
  }

  changeContext(context) {
    return safe.call(this, () => exec.call(this,
      Actions.CHANGE_CONTEXT, { formId: this[internal].model.id, context }));
  }

  changeUi(fieldId, ui) {
    return safe.call(this, () => exec.call(this,
      Actions.CHANGE_UI, { formId: this[internal].model.id, fieldId, ui }));
  }

  submit() {
    return safe.call(this, () => exec.call(this,
      Actions.SUBMIT, { formId: this[internal].model.id }));
  }

  reset() {
    return safe.call(this, () => exec.call(this,
      Actions.RESET, { formId: this[internal].model.id }));
  }

  destroy() {
    const promise = safe.call(this, () => exec.call(this,
      Actions.DESTROY, { formId: this[internal].model.id }));
    this[destroyed] = true;
    return promise;
  }

  get id() {
    return safe.call(this, () => this[external].model.id);
  }

  get fields() {
    return safe.call(this, () => this[external].model.fields);
  }

  get data() {
    return safe.call(this, () => this[external].model.data);
  }

  get context() {
    return safe.call(this, () => this[external].model.context);
  }

  get dirty() {
    return safe.call(this, () => this[external].model.dirty);
  }

  get invalid() {
    return safe.call(this, () => this[external].model.invalid);
  }

  get errors() {
    return safe.call(this, () => this[external].model.errors);
  }

  get pendingActions() {
    return safe.call(this, () => this[external].model.pendingActions);
  }

  get destroyed() {
    return !!this[destroyed];
  }
}

function safe(func) {
  if (this[destroyed]) throwError('Form class - ', errors.ACCESS_DESTROYED_FORM);
  return func();
}

function exec(type, data) {
  const getState = () => this[internal];
  const setForm = (form, step) => {
    this[internal] = form;

    if (step.uiChange) {
      this[external] = form;
      this.onUpdateForm(form);
    }
  };

  return handleAction(getState, setForm)(type, data);
}
