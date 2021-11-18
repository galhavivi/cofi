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

  const reset = useCallback(() => actions.reset(), [actions]);

  return (<>
    <Styled.MainElement>
      <Field id="hobbies" />
      <Styled.FormFooter>
        <Button disabled={model.invalid} onClick={reset}
          aria-label="Reset" variant="contained" color="primary">Reset</Button>
      </Styled.FormFooter>
    </Styled.MainElement>
    <Styled.MainElement>
      <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
    </Styled.MainElement>
  </>);
};

export default createForm(form)(DemoForm);
