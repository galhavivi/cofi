/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useContext, useEffect } from 'react';
import { FormContext } from '@cofi/react-form';
import { iterateSections } from '@cofi/react-layout/Section/utils';
import { iterateBoxes } from '@cofi/react-layout/Box/utils';
import Item from '@cofi/react-layout/Item';
import FormErrors from '@cofi/react-components/form/FormErrors';
import JsonView from '@cofi/react-components/view/JsonView';
import * as Styled from './Styled';

const getSectionId = (fieldId, sections = []) => {
  let sectionId;
  iterateSections(sections, (section) => {
    iterateBoxes(section.boxes, (box) => {
      if (box.props && box.props.id === fieldId) {
        sectionId = section.id;
      }
    });
  });
  return sectionId;
};

const BaseItem = ({ size, title, layout = 'scroll', sections, onSave, onCancel }) => {
  const { model } = useContext(FormContext);
  const [showJson, setShowJson] = useState(false);
  const [selected, setSelected] = useState();
  const [item, setItem] = useState();

  useEffect(() => {
    let mainActions = [];

    if (onCancel) {
      mainActions.push({
        label: 'Cancel',
        type: 'tertiary',
        onClick: () => onCancel(),
      });
    }

    if (onSave) {
      mainActions.push({
        label: 'Save',
        type: 'primary',
        disable: () => !model.dirty || model.invalid || model.processing,
        onClick: async () => onSave({ data: model.data }),
        popover: {
          title: 'Handle Fields',
          open: () => model.invalid,
          component: FormErrors,
          props: { 
            onClickField: (fieldId) => setSelected({ sectionId: getSectionId(fieldId, sections), elementId: fieldId }),
          },
        },
      });
    }

    mainActions = mainActions.length ? mainActions : undefined;

    const optionsActions = [{
      label: showJson ? 'Hide Json' : 'Show Json',
      onClick: () => setShowJson(!showJson),
    }];
  
    setItem({
      size,
      title,
      layout,
      sections,
      selected,
      mainActions,
      optionsActions,
    }); 
  }, [size, title, layout, sections, onSave, onCancel, model.dirty, model.invalid, model.data, model.processing, selected,
    setSelected, showJson, setShowJson]);

  return (<Styled.Row>
    <Item {...item} />
    {
      showJson &&
      <Styled.JsonViewWrapper aria-label="json-view" value={JSON.stringify(model.data)}>
        <JsonView value={model.data} />
      </Styled.JsonViewWrapper>
    }
  </Styled.Row>);
};

export default BaseItem;
