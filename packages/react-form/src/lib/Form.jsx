/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import JForm from '@cofi/form';
import FormContext from './FormContext';

const Form = ({ model, resources, settings, data, context, children }) => {
  const [form, setForm] = useState();
  const [privates] = useState({ models: [] });
  const parent = useContext(FormContext);

  const safeDestroy = async () => {
    // if last init was a success (not failed on definition error)
    if (privates.form && !privates.form.destroyed && privates.lastInitSuccess) {
      await privates.form.destroy();
    }
  };

  // on init and on model prop changes - init
  // queue the changed models, for cases models was changed few times in a row without finish its first init
  useEffect(() => {
    const updatePublicForm = (form) => !privates.destroyed && setForm(form);

    const init = async () => {
      privates.models.push(model);

      if (!privates.processing) {
        privates.processing = true;

        while (privates.models.length) {
          await safeDestroy();
          privates.form = new JForm();
          const currModel = privates.models[0];
          const contextOverride = context ? { context: context } : undefined;
          const formModel = Object.assign({}, currModel, contextOverride);
          privates.lastInitSuccess = await privates.form.init(formModel, resources, settings, updatePublicForm);
          privates.models.shift();
        }
      
        privates.processing = false;
      }
    };

    init();
  }, [model]); // eslint-disable-line

  // on un-mount - mark destroyed, to disable upcoming ui dispatches
  useEffect(() => {
    return () => {
      safeDestroy();
      privates.destroyed = true; 
    };
  }, []); // eslint-disable-line

  // when data prop changes - call changeData
  useEffect(() => { 
    privates.firstTimeData && privates.form.changeData(data);
    privates.firstTimeData = true;
  }, [data]); // eslint-disable-line

  // when context prop changes - call changeData
  useEffect(() => {
    privates.firstTimeContext && privates.form.changeContext(context);
    privates.firstTimeContext = true;
  }, [context]); // eslint-disable-line

  if (!form) return (null);

  const contextValue = {
    parent,
    model: form.model,
    resources: form.resources,
    actions: {
      changeValue: privates.form.changeValue.bind(privates.form),
      changeData: privates.form.changeData.bind(privates.form),
      changeContext: privates.form.changeContext.bind(privates.form),
      changeState: privates.form.changeState.bind(privates.form),
      changeUi: privates.form.changeUi.bind(privates.form),
      submit: privates.form.submit.bind(privates.form),
      reset: privates.form.reset.bind(privates.form),
    },
  };

  return (<FormContext.Provider value={contextValue}><>{children}</></FormContext.Provider>);
};

Form.prototype = {
  model: PropTypes.object.isRequired,
  resources: PropTypes.object,
  settings: PropTypes.object,
  data: PropTypes.object,
  context: PropTypes.object,
};

export default Form;
