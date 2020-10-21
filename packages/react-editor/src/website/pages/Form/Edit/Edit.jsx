/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import service from '../../../service';
import { FormEditor } from '../../../../lib';
import BaseEdit from '../../Base/Edit';
import resources from './resources';

const name = 'form';

const generateId = form => form.model.id;

const EditPage = ({ getData, getDraft, setDraft, save, cancel }) => {
  const [state, setState] = useState();

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      const forms = await service.searchEntity(name);
      const formIds = forms.data.map(x => x.model.id);
      
      const fields = await service.searchEntity('field');

      setState({ data, formIds, libraryFields: fields.data });
    };
    loadData();
  }, [getData]);

  return !state ? (null) : (<FormEditor 
    data={state.data} 
    onSave={save} 
    onCancel={cancel}
    getDraft={getDraft} 
    setDraft={setDraft}
    formIds={state.formIds}
    fieldsLibrary={{ fields: state.libraryFields }}
    appResources={resources}
  />);
};

export default BaseEdit({ name, generateId, EditPage });
