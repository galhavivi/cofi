/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DebugIcon from '@material-ui/icons/BugReport';
import WarnIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import Debugs from './Debugs';
import Errors from './Errors';
import Warnings from './Warnings';
import * as Styled from './Styled';
import info from './info';

const icons = {
  debug: DebugIcon,
  warn: WarnIcon,
  error: ErrorIcon,
};

const Log = ({ log }) => {
  const [tab, setTab] = useState('debug');
  const [aggregate, setAggregate] = useState(true);
  const [showQueueSteps, setShowQueueStep] = useState(false);

  const toggleAggregate = () => setAggregate(!aggregate);
  const toggleShowQueue = () => setShowQueueStep(!showQueueSteps);

  const NoMessages = ({ Icon }) => (<Styled.NoMessages>
    <Icon />
    <div>No Messages</div>
  </Styled.NoMessages>);

  const Tab = ({ label, name }) => (<Styled.Tooltip 
    title={`Last ${log.history[name].length}/${log.settings[`${name}MaxLength`]} records`} 
    arrow={true}>
    <Styled.Tab selected={tab === name} onClick={() => setTab(name)}>{label} ({log.history[name].length})</Styled.Tab>
  </Styled.Tooltip>);

  const items = log.history[tab];

  return (<Styled.Log aria-label="Log">
    <Styled.Header>
      <Styled.Tooltip title={info.title} arrow={true}>
        <Styled.Title>Cofi Log</Styled.Title>
      </Styled.Tooltip>
      <Styled.HeaderActions>
        <Tab name="error" label="Error" />
        <Tab name="warn" label="Warn" />
        <Tab name="debug" label="Debug" />
        <Button onClick={log.clear} color="primary">Clear</Button>
      </Styled.HeaderActions>
    </Styled.Header>
    {
      tab === 'debug' && <Styled.Header>
        <Styled.HeaderActions>
          <Button onClick={toggleAggregate} color="primary">{ aggregate ? 'Spread' : 'Aggregate' }</Button>
          <Button onClick={toggleShowQueue} color="primary">{ showQueueSteps ? 'Hide Queue' : 'Show Queue' }</Button>
        </Styled.HeaderActions>
      </Styled.Header>
    }
    <Styled.Body>
      { 
        !items.length && <NoMessages Icon={icons[tab]} /> 
      }
      { 
        items.length > 0 && tab === 'debug' && <Debugs
          items={items}
          showQueueSteps={showQueueSteps} 
          aggregate={aggregate} /> 
      }
      { 
        items.length > 0 && tab === 'warn' && <Warnings items={items} />
      }
      { 
        items.length > 0 && tab === 'error' && <Errors items={items} />
      }
    </Styled.Body>  
  </Styled.Log>);
};

export default Log;
