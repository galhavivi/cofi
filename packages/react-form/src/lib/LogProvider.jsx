/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { setLogger, Steps } from '@cofi/form';
import LogContext from './LogContext';

const defaultSettings = { 
  debugMaxLength: 50, 
  errorMaxLength: 10, 
  warnMaxLength: 10,
  formIds: [],
};

const initialHistory = { debug: [], warn: [], error: [] };

const addRecord = (history, funcName, record, maxLength) => {
  history[funcName].push(record);

  if (history[funcName].length > maxLength) {
    history[funcName].splice(0, 1);
  }
};

const addRecordAndUpdateLog = (history, setHistory, funcName, record, maxLength, shouldSet = () => true) => {
  addRecord(history, funcName, record, maxLength);

  // optimization - react render for historys component only on specific condition
  if (shouldSet()) {
    setTimeout(() => { // optimization - make page loads faster, since debug message called during init action
      setHistory({ 
        debug: history.debug, 
        warn: history.warn,
        error: history.error,
      });
    });
  }
};

// step exists only for debug records
const getRecordFormId = ({ form, step = {} }) => form && form.model ? form.model.id : step.formId;

const shouldAdd = (record, settings) => !settings.formIds.length ||
  settings.formIds.includes(getRecordFormId(record));

const customLogger = (history, setHistory, settings) => ({
  error: record => shouldAdd(record, settings)
    && addRecordAndUpdateLog(history, setHistory, 'error', record, settings.errorMaxLength),
  warn: record => shouldAdd(record, settings)
    && addRecordAndUpdateLog(history, setHistory, 'warn', record, settings.warnMaxLength),
  debug: record => shouldAdd(record, settings)
    && addRecordAndUpdateLog(history, setHistory, 'debug', record, settings.debugMaxLength,
      () => record.step.type === Steps.END_PROCESSING),
});

const generateId = () => Math.random().toString(16).slice(2);

export default (props) => {
  const [history, setHistory] = useState(cloneDeep(initialHistory));
  const [settings, setSettings] = useState();

  useEffect(() => {
    const _settings = { ...defaultSettings, ...props.settings };
    const name = generateId(); // unique between multiple log provider
    setLogger(name, customLogger(history, setHistory, _settings));
    setSettings(_settings);

    // cleanup
    return () => setLogger(name);
  }, [history, setHistory, props.settings]);

  const clear = useCallback(() => setHistory(cloneDeep(initialHistory)), [setHistory]);

  if (!settings) return (null);

  const context = {
    settings,
    history,
    clear,
  };

  return (<LogContext.Provider value={context}>{ props.children }</LogContext.Provider>);
};
