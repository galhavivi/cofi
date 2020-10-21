/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import ReactJson from 'react-json-view';
import info from '../../info';
import * as Common from '../../Styled';
import * as StyledItem from '../DebugItem/Styled';
import * as Styled from './Styled';

const shouldCollapse = ({ name }) => !['args', 'value', 'state'].find(x => x === name);

const Details = ({ type, info, extra, body, onClose }) => (<Styled.Details>
  <Styled.Header>
    <Styled.Title>
      <Styled.Type>{type}</Styled.Type>
      { extra }
    </Styled.Title>
    <Styled.Close onClick={onClose} />
  </Styled.Header>
  <Styled.Body>
    <p>{info}</p>
    { body }
  </Styled.Body>
</Styled.Details>);

export const StepDetails = ({ record, onClose }) => {
  const { step, form } = record;
  let args = { ...step };
  delete args.type;
  delete args.uiChange;

  const extra = !step.uiChange ? undefined :
    <Common.Tooltip title={info.uiUpdate} arrow={true}>
      <StyledItem.UIUpdate>UI updated</StyledItem.UIUpdate>
    </Common.Tooltip>;

  const body = <>
    <ReactJson src={args} name="args" displayDataTypes={false} enableClipboard={false} shouldCollapse={shouldCollapse} />
    <ReactJson src={form} name="form" displayDataTypes={false} enableClipboard={false} collapsed={true} /> 
  </>;

  return (<Details
    onClose={onClose}
    type={step.type}
    info={info.steps[step.type]}
    extra={extra}
    body={body}
  />);
};

export const ActionDetails = ({ record, onClose }) => {
  const extra = record.duration === undefined ? undefined : 
    <Common.Tooltip title={info.duration} arrow={true}>
      <StyledItem.ActionDuration>{record.duration} ms</StyledItem.ActionDuration> 
    </Common.Tooltip>;
  
  const body = <>
    <ReactJson src={record.data} name="args" displayDataTypes={false} enableClipboard={false} shouldCollapse={shouldCollapse} />
    <ReactJson src={record.steps} name="steps" displayDataTypes={false} enableClipboard={false} collapsed={true} />
  </>;

  return (<Details
    onClose={onClose}
    type={record.type}
    info={info.actions[record.type]}
    extra={extra}
    body={body}
  />);
};
