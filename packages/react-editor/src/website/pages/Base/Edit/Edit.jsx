/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Actions } from '@cofi/form';
import service from '../../../service';

const _generateId = (entity) => entity.id || Math.random().toString(16).slice(2);

const Edit = ({ name, generateId = _generateId, EditPage }) => withRouter(({ match, location, history }) => {

  const getData = async () => {
    const params = new URLSearchParams(location.search); 
    const fromAnotherId = params.get('from');
    const isNew = match.params.id === 'new' && !fromAnotherId;
    const isClone = match.params.id === 'new' && fromAnotherId;
    const entityId = isClone ? fromAnotherId : match.params.id;
    const entity = isNew ? {} : (await service.getEntity(name, entityId) || {});
    if (isClone) {
      delete entity.id;
    }
    return entity;
  };

  const cancel = async () => {
    await setDraft(match.params.id, undefined);
    history.push({ pathname: `/${name}` });
  };

  const save = async (props) => {
    await service.setEntity(name, generateId(props.data), props.data);
    await cancel();
  };

  const setDraft = async (entityId, draft) => service.setEntity('draft', `${name}-${entityId}`, draft);

  const getDraft = async (entityId) => service.getEntity('draft', `${name}-${entityId}`);

  const afterAction = async ({ model, type }) => {
    if (type !== Actions.DESTROY) {
      await setDraft(match.params.id, model);
    }
  };

  return (<EditPage
    id={match.params.id}
    getData={getData} 
    getDraft={getDraft} 
    setDraft={setDraft} 
    save={save} 
    cancel={cancel}
    afterAction={afterAction}
  />);
});

export default Edit;
