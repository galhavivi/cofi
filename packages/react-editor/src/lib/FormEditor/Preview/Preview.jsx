/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext, useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import { Form, FormContext, LogProvider, withLog } from '@cofi/react-form';
import Log from '@cofi/react-components/form/Log';
import Item from '@cofi/react-layout/Item';
import BaseItem from '../../BaseItem';
import { mergeResourcesAndConvertFunctions } from '../utils';
import { getGrid } from './sections';
import * as Styled from './Styled';
import useDebounce from './useDebounce';

const CofiLog = withLog(Log);

const getPlaygroundItem = (model, preview, isDraftModel) => {
  let scope = 'All';

  // if editing a field
  if (preview.type === 'field' && preview.item) {
    // show in preview - only relevant fields
    scope = 'Relevant';

    // when new field - we use the second
    const previewFieldId = preview.item.id;

    if (!isDraftModel) {
      // override previewing data to the model data
      model.fields[previewFieldId] = preview.item;
    }

    // filter out non relevant fields
    Object.keys(model.fields).forEach(fieldId => {
      // field is relevant if:
      // its the editing field - relevant
      // its depend on the editing field
      // the editing field depend on it
      const relevant = 
        (fieldId === previewFieldId) ||
        (preview.item.dependencies || []).includes(fieldId) ||
        (model.fields[fieldId].dependencies || []).includes(previewFieldId);
      
      if (!relevant) {
        delete model.fields[fieldId];
      }
    });
  }

  const fieldIds = Object.keys(model.fields).sort();

  return {
    size: 1,
    layout: 'tabs',
    sections: [{
      id: 'playground',
      title: `Playground (${scope})`,
      grid: getGrid({ templateAreas: fieldIds }),
    }],
  };
};

const getLayoutItem = (item = {}) => ({
  ...item,
  sections: (item.sections || []).map(section => ({
    ...section,
    grid: getGrid(section.grid),
  })),
  mainActions: !item.mainActions ? undefined : item.mainActions.map(x => ({ label: x.label, type: x.type, onClick: noop })),
  optionsActions: !item.optionsActions ? undefined : item.optionsActions.map(x => ({ label: x.label, onClick: noop })),
});

export const PREVIEW_DEBOUNCE_WAIT = 200;

export default ({ afterAction, draft }) => {
  const configForm = useContext(FormContext);
  const [_draft, setDraft] = useState(draft);
  const [state, setState] = useState();
  const [uiState, setUiState] = useState();

  const debouncedState = useDebounce(state, PREVIEW_DEBOUNCE_WAIT);
  
  // after edit item change - clear draft usage
  useEffect(() => _draft && setDraft(), [configForm.model.context.edit]); // eslint-disable-line

  useEffect(() => {
    const { model, settings, resources } = configForm.model.data;
    const { appResources } = configForm.resources;

    const form = {
      model: cloneDeep(_draft || model || {}),
      settings: cloneDeep(settings),
      resources: mergeResourcesAndConvertFunctions(cloneDeep(appResources), cloneDeep(resources)), // merge app and form resources
    };

    form.model.id = form.model.id || 'preview';
    form.model.fields = form.model.fields || {};

    // get preview data
    const preview = configForm.model.context.preview || {};

    const isLayoutPreview = preview.type === 'layout';

    const item = isLayoutPreview ? getLayoutItem(preview.item) : getPlaygroundItem(form.model, preview, !!_draft);

    // apply hooks to persist drafts
    form.resources.hooks = { afterAction };

    const logSettings = { formIds: [form.model.id] };

    setState({ form, item, isLayoutPreview, logSettings });
  }, [configForm.model.data, configForm.model.context.preview, draft]); // eslint-disable-line

  useEffect(() => setUiState(debouncedState), [debouncedState]);

  if (!uiState) return (null);

  const { form, item, isLayoutPreview, logSettings } = uiState;

  return (<Styled.Wrapper aria-label="Preview">
    <LogProvider settings={logSettings}>
      <Form model={form.model} resources={form.resources} settings={form.settings}>
        {
          !isLayoutPreview && <BaseItem {...item} />
        }
        {
          isLayoutPreview && <Item {...item} />
        }
      </Form>
      {
        <Styled.LogWrapper>
          <CofiLog />
        </Styled.LogWrapper>
      }
    </LogProvider>
  </Styled.Wrapper>);
};
