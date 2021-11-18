/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const time = '`${time} ms`'; // eslint-disable-line

const demo = `import React, { useCallback, useContext } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ReactJson from 'react-json-view';
import { createForm, Field, FormContext } from '@cofi/react-form';
import form from './form';

let currentTiming = 'init';

// we dont use "useState" so it wont take more tim to calculate and interfere with the
// calc time of the cofi timing
const duration = {
  init: [],
  changeValue: [],
  changeState: [],
  changeUi: [],
  changeData: [],
  changeContext: [],
  submit: [],
  reset: [],
};

const DemoForm = () => {
  const { model, actions } = useContext(FormContext);

  const timeAction = useCallback((action) => {
    currentTiming = action;
    duration[action] = [];
  }, []);

  const hasDebounce = useCallback((action) => action === 'changeValue' || action === 'changeState', []);

  const getDebounce = useCallback((action) => hasDebounce(action) ? '250 ms' : '', [hasDebounce]);

  const getTiming = useCallback((action) => {
    const timings = duration[action];
    if (timings.length >= 2) {
      const debounce = hasDebounce(action) ? 250 : 0;
      let time = timings[timings.length - 1] - timings[0] - debounce;
      return ${time};
    }
    return '';
  }, [hasDebounce]);

  if (currentTiming) {
    duration[currentTiming].push(Date.now());
  }

  const headerStyle = {
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '1px solid black',
    paddingBottom: '20px',
  };

  const actionsData = {
    init: { label: 'Init form' },
    changeValue: { 
      label: 'Name = "Ross"', 
      func: useCallback(async () => {
        timeAction('changeValue');
        duration[currentTiming] = [];
        await actions.changeValue('name', 'Ross');
        timeAction();
      }, [timeAction, actions]),
    },
    changeState: { 
      label: 'Hobbies search = "ball"',
      func: useCallback(async () => {
        timeAction('changeState');
        const state = { ...model.fields.hobbies.component.state };
        state.search = { value: 'ball' };
        await actions.changeState('hobbies', state);
        timeAction();
      }, [timeAction, actions, model.fields.hobbies.component]),
    },
    changeUi: { 
      label: 'Name component = "Label"',
      func: useCallback(async () => {
        timeAction('changeUi');
        const component = { name: 'label' };
        await actions.changeUi('name', { component });
        timeAction();
      }, [timeAction, actions]),
    },
    changeData: { 
      label: 'New data',
      func: useCallback(async () => {
        timeAction('changeData');
        await actions.changeData({
          id: '7777777',
          name: 'Monica',
          hobbies: ['COOK'],
        });
        timeAction();
      }, [timeAction, actions]),
    },
    changeContext: { 
      label: 'Exclude / Include Id',
      func: useCallback(async () => {
        timeAction('changeContext');
        await actions.changeContext({
          excludeId: !model.context.excludeId,
        });
        timeAction();
      }, [timeAction, actions, model.context]),
    },
    submit: { 
      label: 'Submit form',
      func: useCallback(async () => {
        timeAction('submit');
        const success = await actions.submit();
        if (success) {
          console.log('submit done!'); // eslint-disable-line
        }
        timeAction();
      }, [timeAction, actions]),
    },
    reset: { 
      label: 'Reset form',
      func: useCallback(async () => {
        timeAction('reset');
        await actions.reset();
        timeAction();
      }, [timeAction, actions]),
    },
  };

  const blockerStyle = {
    width: '320px',
    height: '510px',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'not-allowed',
  };

  const rows = Object.keys(actionsData).map(actionName => (
    <Grid key={actionName} action={actionName} container={true} item={true} xs={12}
      style={{ marginBottom: '20px', lineHeight: '30px' }}>
      <Grid item={true} xs={3}>{actionName}</Grid>
      <Grid item={true} xs={4}>{actionsData[actionName].label}</Grid>
      <Grid item={true} xs={2} >{
        actionName !== 'init' && <Button color="primary" variant="contained"
          onClick={actionsData[actionName].func}>Call</Button>}</Grid>
      <Grid item={true} xs={2}><span>{getDebounce(actionName)}</span></Grid>
      <Grid item={true} xs={1}><span>{getTiming(actionName)}</span></Grid>
    </Grid>));
  return (<>
    <Styled.MainElement>
      <div style={blockerStyle} title="Change data from the below actions" />
      <Field id="id" />
      <Field id="name" />
      <Field id="hobbies" />
    </Styled.MainElement>
    <Styled.MainElement>
      <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
    </Styled.MainElement>
    <Styled.MainElementLarge>
      <Grid container={true}>
        <Grid container={true} item={true} xs={12} style={headerStyle}>
          <Grid item={true} xs={3}>Action</Grid>
          <Grid item={true} xs={4}>Description</Grid>
          <Grid item={true} xs={2}>Call</Grid>
          <Grid item={true} xs={2}>Debounce</Grid>
          <Grid item={true} xs={1}>Duration</Grid>
        </Grid>
        {rows}
      </Grid>
    </Styled.MainElementLarge>
  </>);
};

export default createForm(form)(DemoForm);`;

export default {
  exampleName: 'use-context-actions',
  demos: [{
    demo,
    data: true,
    hooks: true,
    terms: true,
    mockService: true,
  }],
};
