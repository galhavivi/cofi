/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import { Form } from '@cofi/react-form';
import BaseItem from '../BaseItem';
import form from './form';
import sections from './sections';

const FieldEditor = ({ data, draft, hooks, onCancel, onSave, fieldIds, contextIds, appResources, 
  size = 1 }) => {
  const [model, setModel] = useState();

  useEffect(() => {
    const _model = draft || { 
      ...form.model,
      fields: applyFieldsAppData(form.model.fields, appResources, fieldIds, contextIds),
      data,
      context: { 
        otherFieldIds: (fieldIds || []).filter(x => x !== (data || {}).id), // validate unique id
      },
    };

    setModel(_model);
  }, [data, (fieldIds || []).join(), (contextIds || []).join(), appResources, draft]); // eslint-disable-line
  
  if (!model) return (null);

  form.resources.hooks = hooks;

  return (<Form model={model} resources={form.resources}>
    <BaseItem 
      size={size}
      sections={sections} 
      onSave={onSave}
      onCancel={onCancel} />
  </Form>);
};

const applyFieldsAppData = (fields, resources = {}, fieldIds = [], contextIds = []) => {
  // apply components options to the component field
  applyFieldAppResources(fields.component, resources.components);

  // apply dependenciesChanges options to the dependenciesChange field
  applyFieldAppResources(fields.dependenciesChange, resources.dependenciesChanges);

  // apply terms options to the terms fields
  applyFieldAppResources(fields.excludeTerm, resources.terms);
  applyFieldAppResources(fields.disableTerm, resources.terms);
  applyFieldAppResources(fields.requireTerm, resources.terms);

  // apply conversions options to the conversions fields
  applyFieldAppResources(fields.formatter, resources.conversions);
  applyFieldAppResources(fields.parser, resources.conversions);

  // apply validators options to the validators field
  applyFieldAppResources(fields.validators, resources.validators);

  // apply field ids to the dependencies field component state
  fields.dependencies.component.state.items = [...fieldIds].sort().map(x => ({ label: x, value: x }));

  // apply context ids to the context field component state
  fields.context.component.state.items = contextIds.sort().map(x => ({ label: x, value: x }));

  return fields;
};

const applyFieldAppResources = (field, resources = {}) => field.component.state = Object.assign(field.component.state || {},
  { options: Object.keys(resources).map(name => ({ name, detailsUrl: resources[name].detailsUrl })) });

export default FieldEditor;
