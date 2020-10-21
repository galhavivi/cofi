/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import { Form } from '@cofi/react-form';
import BaseItem from '../BaseItem';
import form from './form';
import sections from './sections';


const LayoutEditor = ({ data = {}, layoutIds = [], onCancel, onSave, hooks, draft }) => {
  const [model, setModel] = useState();

  useEffect(() => {
    const _model = draft || { 
      ...form.model, 
      data,
      context: { 
        otherLayoutIds: layoutIds.filter(x => x !== data.id),
      },
    };

    setModel(_model);
  }, [data, layoutIds.join(), draft]); // eslint-disable-line

  form.resources.hooks = hooks;

  return !model ? (null) : (<Form model={model} resources={form.resources}>
    <BaseItem 
      size={1} 
      sections={sections}
      onSave={onSave}
      onCancel={onCancel} />
  </Form>);  
};

export default LayoutEditor;
