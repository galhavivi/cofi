/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext, useCallback, useEffect, useState } from 'react';
import { FormContext } from '@cofi/react-form';
import cloneDeep from 'lodash/cloneDeep';
import { mergeResourcesAndConvertFunctions } from '../utils';
import { FieldEditor, LayoutEditor } from '../../index';
import * as Styled from './Styled';

export default ({ appResources, draft, afterAction, onClose }) => {
  const { model, actions } = useContext(FormContext);
  const [fieldResources, setFieldResources] = useState();

  useEffect(() => {
    // merge app and form resources
    const resources = mergeResourcesAndConvertFunctions(cloneDeep(appResources), cloneDeep(model.data.resources));
    setFieldResources(resources);
  }, [appResources, model.data.resources]);

  const configModel = model.data.model || {};

  const close = useCallback(async () => {
    await actions.changeContext({ ...model.context, edit: undefined, preview: undefined });
    onClose && onClose();
  }, [model, actions, onClose]);

  const save = (value, name) => async ({ data }) => {
    const id = data.id;
    const item = { ...data };
    delete item.id;
    await actions.changeValue(name, { ...value, [id]: item });
    await actions.changeContext({ ...model.context, edit: undefined, preview: undefined });
    onClose && onClose();
  };

  const saveField = useCallback(save(configModel.fields, 'fields'));

  const saveLayout = useCallback(save(model.data.layouts, 'layouts'));

  // after each edit - update the preview object in the context
  const afterChangeValue = useCallback(props => {
    setTimeout(() => { // optimization - not to hang field editor lifecycle
      actions.changeContext({ ...model.context, preview: { ...model.context.preview, item: props.model.data } });
    });
  }, [actions, model]);

  if (!model.context.edit || !fieldResources) return (null);

  return (<Styled.Wrapper aria-label="Edit Item" type={model.context.edit.type}>
    {
      model.context.edit.type === 'field' &&
      <FieldEditor
        data={model.context.edit.item} 
        fieldIds={Object.keys(configModel.fields || {})}
        contextIds={Object.keys(configModel.context || {})}
        appResources={fieldResources}
        onCancel={close} 
        onSave={saveField}
        hooks={{ afterAction, afterChangeValue }}
        draft={draft}
      />
    }
    {
      model.context.edit.type === 'layout' &&
      <LayoutEditor 
        data={model.context.edit.item}
        layoutIds={Object.keys(model.data.layouts || {})}
        onCancel={close} 
        onSave={saveLayout}
        hooks={{ afterAction, afterChangeValue }}
        draft={draft}
      />
    }
  </Styled.Wrapper>);
};
