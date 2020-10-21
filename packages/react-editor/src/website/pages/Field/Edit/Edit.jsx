/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect, useCallback } from 'react';
import service from '../../../service';
import { FieldEditor } from '../../../../lib';
import BaseEdit from '../../Base/Edit';
import appResources from '../../Form/Edit/resources';

const name = 'field';

const EditPage = ({ id, getData, getDraft, save, cancel, afterAction }) => {
  const [state, setState] = useState();

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      const draft = await getDraft(id);
      const forms = await service.searchEntity(name) || {};
      setState({ data, draft, fieldIds: forms.data.map(x => x.id) });
    };
    loadData();
  }, [id, getData, getDraft]);

  const onSave = useCallback(async (props) => {
    await save(props);

    // update all referenced fields in the db
    const { data } = props;
    const forms = await service.searchEntity('form') || {};
    const referencedForms = forms.data.filter(form => (form.model.fields[data.id] || {})._referenced);
    referencedForms.forEach(form => {
      form.model.fields[data.id] = { ...data, _referenced: true };
      service.setEntity('form', form.id, form);
    });
  }, [save]);
  
  return !state ? (null) : (<FieldEditor
    data={state.data} 
    onCancel={cancel}
    onSave={onSave} 
    fieldIds={state.fieldIds}
    appResources={appResources}
    hooks={{ afterAction }}
    draft={state.draft}
    size={4}
  />);
};


export default BaseEdit({ name, EditPage });
