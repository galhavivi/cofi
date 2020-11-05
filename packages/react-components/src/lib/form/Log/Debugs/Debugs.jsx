/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useCallback } from 'react';
import { Steps as StepsTypes, Actions as ActionsTypes } from '@cofi/form';
import * as Styled from '../Styled';
import { ActionItem, StepItem, getDuration } from './DebugItem';
import { StepDetails, ActionDetails } from './DebugItemDetails';

const adjustItems = items => {
  // replace pre action steps action (which are non queue steps) to have the next action (with action id) data
  items.forEach((item, index) => {
    let nextRecord;

    if (item.step.type === StepsTypes.SET_FORM) {
      nextRecord = items.filter((x, i) => i > index)
        .find(x => x.action?.type === ActionsTypes.INIT && x.step.formId === item.step.model.id);
    }
    if (item.step.type === StepsTypes.SET_FIELD_COMPONENT_VALUE) {
      nextRecord = items.filter((x, i) => i > index)
        .find(x => x.action?.type === ActionsTypes.CHANGE_VALUE && x.step.formId === item.step.formId &&
          x.step.fieldId === item.step.fieldId);
    }
    if (item.step.type === StepsTypes.SET_FIELD_COMPONENT_STATE) {
      nextRecord = items.filter((x, i) => i > index)
        .find(x => x.action?.type === ActionsTypes.CHANGE_STATE && x.step.formId === item.step.formId &&
          x.step.fieldId === item.step.fieldId);
    }

    item.action = nextRecord ? nextRecord.action : (item.action || { id: '', type: 'QUEUE', data: {} });
  });

  return items;
};

const aggregateActionsSteps = debug => {
  const actions = [];
  let processedAction;

  debug.forEach((record, index) => {
    if (!processedAction) {
      // create new action
      processedAction = { ...record.action, steps: [] };
    }
    // add step to action
    processedAction.steps.push({ step: record.step, form: record.form });

    // if next step is of a new action
    const nextRecord = debug[index + 1];
    if (!nextRecord || processedAction.id !== nextRecord.action.id) {
      // add it to actions
      const endActionRecord = processedAction.steps.find(record => record.step.type === StepsTypes.END_ACTION) || {};
      const action = actions.find(x => x.id === endActionRecord.step?.actionId);
      if (action) {
        action.duration = getDuration(endActionRecord.step);
      }
      actions.push(processedAction);

      // reset 
      processedAction = undefined;
    }
  });

  return actions;
};

export default ({ items, aggregate, showQueueSteps }) => {
  const [selected, setSelected] = useState();

  const onClose = useCallback(() => setSelected(), []);

  if (aggregate) {
    items = adjustItems(items);
    items = aggregateActionsSteps(items);  
  } else {
    adjustItems(items);
    const tempActions = aggregateActionsSteps(items);  
    items = items.map(step => ({ ...step, action: tempActions.find(x => x.id === step.action.id) }));
  }

  const Item = aggregate ? ActionItem : StepItem;
  
  const showActionHeader = useCallback((item, index) => {
    if (index === 0 || showQueueSteps) return true;

    // if the action id is the same action before the prev queue action
    return item.id !== items[index - 2]?.id;
  }, [items, showQueueSteps]);

  return (<>
    <Styled.Items>
      {
        items.map((item, index) => (<Styled.Item key={index}>
          <Item item={item} showQueueSteps={showQueueSteps} selected={selected} setSelected={setSelected}
            showActionHeader={showActionHeader(item, index)} />
        </Styled.Item>))
      }
    </Styled.Items>
    {
      selected && selected.step && <StepDetails record={selected} onClose={onClose} />
    }
    {
      selected && selected.data && <ActionDetails record={selected} onClose={onClose} />
    }
  </>);
};
