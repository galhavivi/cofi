/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect, useCallback } from 'react';
import noop from 'lodash/noop';
import { Form } from '@cofi/react-form';
import { Actions } from '@cofi/form';
import { model as initialModel, resources } from './EditConfig/form';
import EditConfig from './EditConfig';
import EditItem from './EditItem';
import Preview from './Preview';
import * as Styled from './Styled';

const FormEditor = ({ data = {}, formIds = [], fieldsLibrary, appResources = {}, onCancel, onSave,
  getDraft = noop, setDraft = noop }) => {
  const [state, setState] = useState();

  useEffect(() => {
    const loadData = async () => {
      const formId = (data.model || {}).id;

      const draft = await getDraft(formId) || {};

      const model = draft.config || { 
        ...initialModel, 
        data, 
        context: { 
          formIds: formIds.filter(id => id !== formId),
          fieldsLibrary,
        }, 
      };

      setState({ model, draft });
    };
    loadData();
  }, []); // eslint-disable-line

  // apply app resources
  resources.appResources = appResources;

  // on cancel edit form config - clear form draft
  const cancel = useCallback(async () => {
    const formId = (data.model || {}).id;
    await setDraft(formId, undefined);
    onCancel();
  }, [onCancel, setDraft, data]);

  // on save edit form config - clear form draft
  const save = useCallback(async (props) => {
    const formId = (data.model || {}).id;
    await setDraft(formId, undefined);
    onSave(props);
  }, [onSave, setDraft, data]);

  // after config change - save draft
  resources.hooks = { 
    afterAction: useCallback(async ({ model, type }) => {
      if (type !== Actions.DESTROY) {
        const formId = (data.model || {}).id;
        const draft = await getDraft(formId) || {};
        draft.config = model;
        await setDraft(formId, draft);
      }
    }, [getDraft, setDraft, data]), 
  };

  // after edit item change - save draft
  const editItemAfterAction = useCallback(async ({ model, type }) => {
    if (type !== Actions.DESTROY) {
      const formId = (data.model || {}).id;
      const draft = await getDraft(formId) || {};
      draft.edit = model;
      setDraft(formId, draft); // without await so it wont slow down the queue of actions
    }
  }, [getDraft, setDraft, data]);

  // after preview change - save draft
  const previewAfterAction = useCallback(async ({ model, type }) => {
    if (type !== Actions.DESTROY) {
      const formId = (data.model || {}).id;
      const draft = await getDraft(formId) || {};
      draft.preview = model;
      setDraft(formId, draft); // without await so it wont slow down the queue of actions
    }
  }, [getDraft, setDraft, data]);

  // on close edit item (after save / cancel) - remove the item draft and preview drafts
  const clearSubDrafts = useCallback(async () => {
    const formId = (data.model || {}).id;
    const draft = await getDraft(formId);
    const newDraft = { id: draft.id, config: draft.config };
    setDraft(formId, newDraft);

    // update state (for items that initialized with draft on load)
    setState({ ...state, draft: newDraft });
  }, [data, getDraft, setDraft, state]);

  return !state ? (null) : (
    <Form model={state.model} resources={resources}>
      <Styled.Wrapper aria-label="Form Editor">
        <EditConfig 
          onSave={save} 
          onCancel={cancel}
        />
        <EditItem 
          draft={state.draft.edit} 
          afterAction={editItemAfterAction}
          onClose={clearSubDrafts}
          appResources={appResources} 
        />
        <Preview 
          draft={state.draft.preview} 
          afterAction={previewAfterAction}
        />
      </Styled.Wrapper>
    </Form>
  );  
};

export default FormEditor;
