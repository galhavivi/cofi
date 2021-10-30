/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import { createForm, FormContext, createField } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import FieldView from './CustomFieldView';
import form from './form';

const Field = createField(FieldView);

const DemoForm = () => {
  const { model, actions } = useContext(FormContext);

  const reset = useCallback(() => actions.reset(), [actions]);

  const save = useCallback(() => console.log('Saving data to the server...', model.data), [actions]); // eslint-disable-line

  return (<>
    <Styled.MainElement>
      <Styled.SectionTitle>First Section</Styled.SectionTitle>
      <Field id="id" />
      <Styled.SectionTitle>Second Section</Styled.SectionTitle>
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

export default createForm(form)(DemoForm);
