/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  isUndefined,
  isNumber,
  isFunction,
  isPlainObject,
} from 'lodash';
import { throwError, errors } from './errors';
import log from './log';
import terms from './terms';
import hooks from './hooks';

const ERROR_PREFIX = 'Form definition -';

export function verifyForm(form) {
  checkId(form);
  checkData(form);
  checkFieldsDefinedAsObject(form);
  checkFieldsPath(form);
  checkComponents(form);
  checkComponentsStateChange(form);
  checkRedundantConversions(form);
  checkConversions(form);
  checkFieldsDependencies(form);
  checkFieldsDependenciesChange(form);
  checkValidators(form);
  checkTerms(form);
  checkEmptyTermIntegrity(form);
  checkHooks(form);
  checkDependenciesCircularPotential(form);
  checkSettings(form);
}

// check that model.id defined
function checkId(form) {
  if (!form.model.id) {
    throwError(ERROR_PREFIX, errors.MISSING_ID, form);
  }
}

// check that model.data is an object
function checkData(form) {
  if (!form.model.data || !isPlainObject(form.model.data)) {
    throwError(ERROR_PREFIX, errors.MISSING_DATA, form);
  }
}

// Check if fields are defined properly
function checkFieldsDefinedAsObject(form) {
  // Is fields attribute are objects
  if (!form.model.fields
    || !isPlainObject(form.model.fields)
    || Object.keys(form.model.fields).length === 0) {
      throwError(ERROR_PREFIX, errors.MISSING_FIELDS, form);
  }
}

// check that all fields has path
function checkFieldsPath(form) {
  const fieldId = Object.keys(form.model.fields).find(id => !form.model.fields[id].path);
  if (fieldId) {
    throwError(ERROR_PREFIX, errors.MISSING_FIELD_PATH, form, {}, [fieldId]);
  }
}

// check that all fields if they defined component
// then it should also define component.name
// and it should also be defined in resources.components
function checkComponents(form) {
  const { model, resources } = form;
  const fieldId = Object.keys(model.fields).find(id => model.fields[id].component
    && (!model.fields[id].component.name
     || !resources.components
     || !resources.components[model.fields[id].component.name]
     || !resources.components[model.fields[id].component.name].renderer));
  if (fieldId) {
    throwError(ERROR_PREFIX, errors.MISSING_COMPONENT, form, {}, [fieldId]);
  }
}

// check that if stateChange is defined - it should be a function
function checkComponentsStateChange(form) {
  const { resources } = form;
  const componentName = Object.keys(resources.components || {}).find(name => !isUndefined(resources.components[name].stateChange)
     && !isFunction(resources.components[name].stateChange));
  if (componentName) {
    throwError(ERROR_PREFIX, errors.INVALID_STATE_CHANGE, form, {}, [componentName]);
  }
}

// check that all fields if they defined formatter / parser
// then it should be defined in resources.conversions as well
function checkRedundantConversions(form) {
  const { model } = form;
  ['formatter', 'parser'].forEach((conversionName) => {
    const fieldId = Object.keys(model.fields).find(id => model.fields[id][conversionName] && !model.fields[id].component);
    if (fieldId) {
      const { name } = model.fields[fieldId][conversionName];
      throwError(ERROR_PREFIX, errors.REDUNDANT_CONVERSION, form, {}, [fieldId, conversionName, name]);
    }
  });
}

// check that all fields if they defined formatter / parser
// then it should be defined in resources.conversions as well
function checkConversions(form) {
  const { model, resources } = form;
  ['formatter', 'parser'].forEach((conversionName) => {
    const fieldId = Object.keys(model.fields).find(id => model.fields[id][conversionName]
      && (!resources.conversions
        || !isPlainObject(resources.conversions[model.fields[id][conversionName].name])
        || !isFunction(resources.conversions[model.fields[id][conversionName].name].func)));
    if (fieldId) {
      const { name } = model.fields[fieldId][conversionName];
      throwError(ERROR_PREFIX, errors.MISSING_CONVERSION, form, {}, [fieldId, conversionName, name]);
    }
  });
}

// check that all fields if they defined dependencies - they also should be defined in model.fields as well
function checkFieldsDependencies(form) {
  const { model } = form;
  const fieldId = Object.keys(model.fields).find(id => model.fields[id].dependencies
    && model.fields[id].dependencies.find(id => isUndefined(model.fields[id])));
  if (fieldId) {
    const dependOnField = model.fields[fieldId].dependencies.find(id => isUndefined(model.fields[id]));
    throwError(ERROR_PREFIX, errors.MISSING_DEPENDENCIES_FIELD, form, {}, [fieldId, dependOnField]);
  }
}

// check that all fields if they defined dependenciesChange - it should be defined in resources.dependenciesChanges object as well
function checkFieldsDependenciesChange(form) {
  const { model, resources } = form;
  const fieldId = Object.keys(model.fields).find(id => model.fields[id].dependenciesChange
    && (!resources.dependenciesChanges
      || !isPlainObject(resources.dependenciesChanges[model.fields[id].dependenciesChange.name])
      || !isFunction(resources.dependenciesChanges[model.fields[id].dependenciesChange.name].func)));
  if (fieldId) {
    const { name } = model.fields[fieldId].dependenciesChange;
    throwError(ERROR_PREFIX, errors.MISSING_DEPENDENCIES_CHANGE, form, {}, [fieldId, name]);
  }
}

// check that all fields if they defined validators - then validator.name should be defined in resources.validators as well,
// with func and message
function checkValidators(form) {
  const { model, resources } = form;
  const fieldId = Object.keys(model.fields).find(id => model.fields[id].validators
    && model.fields[id].validators.find(validator => isUndefined(resources.validators)
      || !isPlainObject(resources.validators[validator.name])
      || !isFunction(resources.validators[validator.name].func)
      || !isFunction(resources.validators[validator.name].message)));
  if (fieldId) {
    const validator = model.fields[fieldId].validators.find(validator => isUndefined(resources.validators)
      || !isPlainObject(resources.validators[validator.name])
      || !isFunction(resources.validators[validator.name].func)
      || !isFunction(resources.validators[validator.name].message));
    throwError(ERROR_PREFIX, errors.MISSING_VALIDATOR, form, {}, [fieldId, validator.name]);
  }
}

// check that all fields if they defined terms (excludeTerm / disableTerm / requireTerm) - then term.name should be defined
// in resources.terms as well
function checkTerms(form) {
  const { model, resources } = form;
  ['excludeTerm', 'disableTerm', 'requireTerm'].forEach((termName) => {
    const fieldId = Object.keys(model.fields).find(id => model.fields[id][termName]
      && getTermsFuncNames(model.fields[id][termName]).find(name => !resources.terms
        || !isPlainObject(resources.terms[name])
        || !isFunction(resources.terms[name].func)));
    if (fieldId) {
      const name = getTermsFuncNames(model.fields[fieldId][termName]).find(name => !resources.terms
        || !isFunction(resources.terms[name]));
      throwError(ERROR_PREFIX, errors.MISSING_TERM, form, {}, [fieldId, termName, name]);
    }
  });
}

// check that isEmpty has consistent behaviour in the form
function checkEmptyTermIntegrity(form) {
  // if empty term was overridden instead of overriding the isEmpty hook that is used in more places in the
  // form's lifecycle and can hurt form integrity
  if (form.resources.terms.empty && ((form.resources.terms.empty.func || {}).toString() !== terms.empty.func.toString())) {
    const message = `Term 'empty' was overridden in resources.terms.empty. This term calls 'isEmpty' hook. `
    + `This hook is also called from other parts of the form's lifecycle. So in order to keep form integrity (i.e field  `
    + `is considered empty in all lifecycle parts the same way), you should only override this hook instead of the empty term`;
    log.warn({ message, form });
  }
}

function getTermsFuncNames(term, names = []) {
  if (term.name) {
    names.push(term.name);
  } else {
    (term.terms || []).forEach(t => getTermsFuncNames(t, names));
  }
  return names;
}

// Check if hooks are defined properly
function checkHooks(form) {
  const { resources } = form;
  if (!resources.hooks || !isPlainObject(resources.hooks)) {
    throwError(ERROR_PREFIX, errors.MISSING_HOOKS, { resources });
  }
  const supportedHooks = Object.keys(hooks);
  const hook = Object.keys(resources.hooks).find(key => !supportedHooks.includes(key));
  if (hook) {
    throwError(ERROR_PREFIX, errors.INVALID_HOOK, form, {}, [hook, supportedHooks]);
  }
}

// check that all fields if they defined dependencies - there is no potential to a circular field dependencies in the model
// NOTE: dont throw error - this is just a wanning.
function checkDependenciesCircularPotential(form) {
  const { model } = form;
  const fieldId = Object.keys(model.fields).find(id => model.fields[id].dependencies
    && isPotentialCircularDependencies(model, id));

  if (fieldId) {
    const dependencies = [];
    isPotentialCircularDependencies(model, fieldId, dependencies);
    const dependenciesStr = dependencies.join(' -> ');

    const message = `field "${fieldId}" defined dependencies: ${dependenciesStr}. For those fields make sure that their `
    + '"dependenciesChange" function (if defined) does not all return value that will cause circular dependencies';

    log.warn({ message, form });
  }
}

function isPotentialCircularDependencies(model, fieldId, dependencies = []) {
  dependencies.push(fieldId);
  if (dependencies.length > 1 && dependencies[0] === fieldId) {
    return true;
  }

  let isCircular = false;
  (model.fields[fieldId].dependencies || []).forEach((id) => {
    isCircular = isCircular || isPotentialCircularDependencies(model, id, dependencies);
  });

  return isCircular;
}

// Check if hooks are defined properly
function checkSettings(form) {
  const { settings } = form;
  ['changeValueDebounceWait', 'changeValueDebounceMaxWait', 'changeStateDebounceWait', 'changeStateDebounceMaxWait']
  .forEach((key) => {
    if (!isUndefined(settings[key])
      && (!isNumber(settings[key]) || settings[key] < 0)) {
      throwError(ERROR_PREFIX, errors.INVALID_SETTING, form, {}, ['key', 'a positive number']);
    }
  });
}
