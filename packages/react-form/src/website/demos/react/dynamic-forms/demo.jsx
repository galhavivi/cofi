/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useCallback, useContext } from 'react';
import Button from '@mui/material/Button';
import ReactJson from 'react-json-view';
import { createForm, FormContext, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import form from './form';

const DemoForm = () => {
  const { model, actions } = useContext(FormContext);

  const save = useCallback(() => actions.changeData({}), [actions]);

  return (<>
    <Styled.MainElement>
      <Field id="name" />
      <Field id="address" />
      <Field id="employees" />
      <Styled.FormFooter>
        <Button disabled={!model.dirty || model.invalid || model.processing} onClick={save}
          aria-label="Save" color="primary" variant="contained">Save</Button>
      </Styled.FormFooter>
    </Styled.MainElement>
    <Styled.MainElement>
      <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
    </Styled.MainElement>
  </>);
};

export default createForm(form)(DemoForm);
