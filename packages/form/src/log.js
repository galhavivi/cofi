/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
import { createError, errors } from './errors';

export const logLevels = {
  DEBUG: 'debug',
  WARN: 'warn',
  ERROR: 'error',
  NONE: 'none',
};

const logLevelsValue = {
  debug: 3,
  warn: 2,
  error: 1,
  none: 0,
};

const ERROR_PREFIX = 'Form log -';

export const DEFAULT_LOG_LEVEL = process.env.NODE_ENV === 'development' ? logLevels.DEBUG : logLevels.ERROR;

let logLevel = DEFAULT_LOG_LEVEL;

export const defaultLogger = {
  debug: ({ action, step, form }) => {
    const formId = form && form.model ? form.model.id : step.formId;
    const duration = ((step.actionMetadata || {}).end) ? ` | %c${step.actionMetadata.end - step.actionMetadata.start} ms` : '';
    const uiUpdated = step.uiChange ? ' | %cUI updated' : '';
    const title = `\nCofi | ${formId} | ${action?.type || 'QUEUE'} | ${step.type}${duration}${uiUpdated}\n`;
    let css = '';
    if (step.uiChange || duration) {
      css = step.uiChange ? 'color:#ec44a8;' : 'color: #0095ff;';
    }
    console.debug(title, css,  // eslint-disable-line
      '\n action:', action,
      '\n step:  ', step,
      '\n form:  ', form,
      '\n\n');
  },
  warn: ({ message, form }) => {
    console.warn(`Cofi warning - ${message}`, '\nform: ', form); // eslint-disable-line
  },
  error: (error) => {
    let currError = error;
    while (currError) {
      const args = [currError.toString()];
      if (currError.form) {
        Array.prototype.push.apply(args, ['\nform: ', currError.form]);
      }
      if (currError.data) {
        Array.prototype.push.apply(args, ['\ndata: ', currError.data]);
      }

      console.error(...args); // eslint-disable-line

      currError = currError.subError;
    }
  },
};

const loggers = {
  default: defaultLogger,
};

export const setLogLevel = (level) => {
  if (Object.values(logLevels).includes(level)) {
    logLevel = level;
  } else {
    const err = createError(ERROR_PREFIX, errors.INVALID_LOG_LEVEL, {}, {}, [level]);
    errorInternal(err);
  }
  return logLevel;
};

const verifyLogFunction = (logger, func) => {
  if (!isFunction(logger[func])) {
    errorInternal(createError(ERROR_PREFIX, errors.INVALID_LOG_FUNCTION, {}, {}, [func]));
    return false;
  }
  return true;
};

export const setLogger = (name = 'default', customLogger) => {
  if (!customLogger) {
    delete loggers[name];
    return;
  }

  const defaults = loggers[name] || { debug: noop, warn: noop, error: noop };
  const logger = { ...defaults, ...customLogger };

  if (verifyLogFunction(logger, 'debug')
      && verifyLogFunction(logger, 'warn')
      && verifyLogFunction(logger, 'error')) {
    loggers[name] = logger;
  }
};

const shouldLog = level => logLevelsValue[level] <= logLevelsValue[logLevel] && console;

const execLog = (func, props) => Object.values(loggers).forEach(logger => logger[func](props));

// error - CofiError object
const errorInternal = error => shouldLog(logLevels.ERROR) && execLog('error', error);

// props = { message, form }
const warnInternal = props => shouldLog(logLevels.WARN) && execLog('warn', props);

// props = { action, step, form }
const debugInternal = props => shouldLog(logLevels.DEBUG) && execLog('debug', props);

// used internally during form's lifecycle
export default {
  debug: debugInternal,
  warn: warnInternal,
  error: errorInternal,
};
