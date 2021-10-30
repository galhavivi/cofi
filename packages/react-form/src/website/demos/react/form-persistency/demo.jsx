/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useCallback, useContext } from 'react';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import { createForm, FormContext, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import formDefinition from './form';

const localStorageKey = 'user-form';

const getFormDefinition = () => {
  const form = cloneDeep(formDefinition); // formDefinition is shared also for example code usage

  // Retrieve the model from storage
  const prevModelStringify = localStorage.getItem(localStorageKey);
  if (prevModelStringify) {
    form.model = JSON.parse(prevModelStringify);
  }

  return form;
};

const DemoForm = () => {
  const { model, actions } = useContext(FormContext);

  const reset = useCallback(() => actions.reset(), [actions]);

  const save = useCallback(() => {
    console.log('Saving data to the server...', model.data); // eslint-disable-line

    // remove saved form from local storage
    localStorage.removeItem(localStorageKey);
  }, [model.data]);

  return (<>
    <Styled.MainElement>
      <Field id="id" />
      <Field id="name" />
      <Field id="hobbies" />
      <Styled.FormFooter>
        <Button disabled={model.invalid} onClick={reset}
          aria-label="Reset" color="primary">Reset</Button>
        <Button disabled={!model.dirty || model.invalid
          || model.processing} onClick={save}
        aria-label="Save" color="primary" variant="contained">Save</Button>
      </Styled.FormFooter>
    </Styled.MainElement>
    <Styled.MainElement>
      <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
    </Styled.MainElement>
  </>);
};

// get form from the storage if exists
const form = getFormDefinition();
export default createForm(form)(DemoForm);
