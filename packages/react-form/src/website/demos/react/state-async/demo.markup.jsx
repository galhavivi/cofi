/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useCallback, useContext } from 'react';
import { createForm, FormContext, createForm } from '@cofi/react-form';
import Button from '@mui/material/Button';
import ReactJson from 'react-json-view';
import form from './form/index.js';


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

export default createForm(form)(DemoForm);`;

export default {
  exampleName: 'state-async',
  demos: [{
    demo,
    data: true,
    mockService: true,
  }],
};
