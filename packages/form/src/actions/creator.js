
/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Steps } from './types';

export function addAction(formId, action) {
  return {
    type: Steps.ADD_ACTION,
    formId,
    action,
  };
}

export function startProcessing(formId) {
  return {
    type: Steps.START_PROCESSING,
    formId,
  };
}

export function endProcessing(formId) {
  return {
    type: Steps.END_PROCESSING,
    formId,
  };
}

export function shiftAction(formId) {
  return {
    type: Steps.SHIFT_ACTION,
    formId,
  };
}

export function startAction(formId, actionId, actionType, actionData, actionMetadata) {
  return {
    type: Steps.START_ACTION,
    formId,
    actionId,
    actionType,
    actionData,
    actionMetadata,
  };
}

export function endAction(formId, actionId, actionType, actionData, actionMetadata) {
  return {
    type: Steps.END_ACTION,
    formId,
    actionId,
    actionType,
    actionData,
    actionMetadata,
  };
}

export function setForm(model, resources, settings) {
  return {
    type: Steps.SET_FORM,
    model,
    resources,
    settings,
  };
}

export function removeForm(formId) {
  return {
    type: Steps.REMOVE_FORM,
    formId,
  };
}

export function setFormEvaluation(formId, invalid, dirty, errors) {
  return {
    type: Steps.SET_FORM_EVALUATION,
    formId,
    invalid,
    dirty,
    errors,
  };
}

export function setFormInitializedData(formId, data) {
  return {
    type: Steps.SET_FORM_INITIALIZED_DATA,
    formId,
    data,
  };
}

export function setFormErrors(formId, errors) {
  return {
    type: Steps.SET_FORM_ERRORS,
    formId,
    errors,
  };
}

export function setFieldsErrors(formId, errors) {
  return {
    type: Steps.SET_FIELDS_ERRORS,
    formId,
    errors,
  };
}

export function setFormData(formId, data) {
  return {
    type: Steps.SET_FORM_DATA,
    formId,
    data,
  };
}

export function setFormContext(formId, context) {
  return {
    type: Steps.SET_FORM_CONTEXT,
    formId,
    context,
  };
}

export function setFieldUi(formId, fieldId, ui) {
  return {
    type: Steps.SET_FIELD_UI,
    formId,
    fieldId,
    ui,
  };
}

export function setFieldComponentState(formId, fieldId, state) {
  return {
    type: Steps.SET_FIELD_COMPONENT_STATE,
    formId,
    fieldId,
    state,
  };
}

export function setFieldComponentPrevState(formId, fieldId) {
  return {
    type: Steps.SET_FIELD_COMPONENT_PREV_STATE,
    formId,
    fieldId,
  };
}

export function setFieldComponentValue(formId, fieldId, value) {
  return {
    type: Steps.SET_FIELD_COMPONENT_VALUE,
    formId,
    fieldId,
    value,
  };
}

export function setFieldComponentValueBatch(formId, batch) {
  return {
    type: Steps.SET_FIELD_COMPONENT_VALUE_BATCH,
    formId,
    batch,
  };
}

export function setFieldValue(formId, fieldId, value) {
  return {
    type: Steps.SET_FIELD_VALUE,
    formId,
    fieldId,
    value,
  };
}

export function setFieldEvaluation(formId, fieldId, excluded, disabled, dirty, required, empty, invalid, errors) {
  return {
    type: Steps.SET_FIELD_EVALUATION,
    formId,
    fieldId,
    excluded,
    disabled,
    dirty,
    required,
    empty,
    invalid,
    errors,
  };
}
