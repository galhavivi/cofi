/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useCallback } from 'react';
import { Steps as StepsTypes } from '@cofi/form';
import info from '../../info';
import * as Common from '../../Styled';
import * as Styled from './Styled';

const MAX_TOOLTIP_LENGTH = 500;

const getTooltipText = obj => { 
  const str = JSON.stringify(obj);
  return str.length <= MAX_TOOLTIP_LENGTH ? str : `${str.substr(0, MAX_TOOLTIP_LENGTH)}...`;
};

const getActionTooltip = (action) => `${action.type} - ${getTooltipText(action.data)}`;

const getStepTooltip = (step) => `${step.type} - ${getTooltipText({ ...step, type: undefined, uiChange: undefined })}`;

const isQueueStep = (type) => 
  type === StepsTypes.START_PROCESSING ||
  type === StepsTypes.END_PROCESSING ||
  type === StepsTypes.START_ACTION ||
  type === StepsTypes.END_ACTION ||
  type === StepsTypes.ADD_ACTION ||
  type === StepsTypes.SHIFT_ACTION;

const isQueueAction = type => type === 'QUEUE';

export const getDuration = (endActionStep) => !endActionStep ? undefined :
  endActionStep.actionMetadata.end - endActionStep.actionMetadata.start;

export const ActionItem = ({ item, showQueueSteps, selected, setSelected }) => {
  const { id, type, data, duration, steps } = item;

  const selectAction = useCallback(() => setSelected(item), [setSelected, item]);

  return !showQueueSteps && isQueueAction(type) ? (null) : (<Styled.Action isQueueAction={isQueueAction(type)}>
    <Styled.Header onClick={selectAction}>
      <Common.Tooltip title={getActionTooltip({ type, data })} arrow={true}>
        <Styled.ActionType selected={selected && selected.id === id}>{type}</Styled.ActionType>
      </Common.Tooltip>
      { 
        duration !== undefined &&
        <Common.Tooltip title={info.duration} arrow={true}>
          <Styled.ActionDuration>{duration} ms</Styled.ActionDuration> 
        </Common.Tooltip>
      }
    </Styled.Header>
    <Styled.Steps>
      {
        steps.map((record, j) => (
          <Styled.Step key={j} onClick={() => setSelected(record)}>
            <Common.Tooltip title={getStepTooltip(record.step)} arrow={true}>
              <Styled.StepType selected={selected && selected.step === record.step}>{record.step.type}</Styled.StepType>
            </Common.Tooltip>
            { record.step.uiChange && <Common.Tooltip title={info.uiUpdate} arrow={true}>
              <Styled.UIUpdate>UI updated</Styled.UIUpdate>
            </Common.Tooltip>
            }
          </Styled.Step>
        ))
      }
    </Styled.Steps>
  </Styled.Action>);
};

export const StepItem = ({ item, showQueueSteps, selected, setSelected }) => {
  const { step, action } = item;
  
  const selectAction = useCallback(() => setSelected(action), [setSelected, action]);
  
  const selectStep = useCallback(() => setSelected(item), [setSelected, item]);

  const isStepSelected = selected && selected.step === step;

  const isActionSelected = selected && selected.id === action.id;

  return !showQueueSteps && isQueueStep(step.type) ? (null) : 
    (<Styled.SpreadStep isQueueStep={isQueueStep(step.type)}>

      <Common.Tooltip title={getActionTooltip(action)} arrow={true}>
        <Styled.ActionType selected={isActionSelected} onClick={selectAction}>{action.type}</Styled.ActionType>
      </Common.Tooltip>

      <Common.Tooltip title={getStepTooltip(step)} arrow={true}>
        <Styled.StepType selected={isStepSelected} onClick={selectStep}>{step.type}</Styled.StepType>
      </Common.Tooltip>
      
      <div>
        { step.uiChange && 
          <Common.Tooltip title={info.uiUpdate} arrow={true}>
            <Styled.UIUpdate>UI updated</Styled.UIUpdate>
          </Common.Tooltip>
        }
        { step.type === StepsTypes.END_ACTION &&
          <Common.Tooltip title={info.duration} arrow={true}>
            <Styled.ActionDuration>{getDuration(step)} ms</Styled.ActionDuration> 
          </Common.Tooltip>
        }
      </div>
    </Styled.SpreadStep>);
};
