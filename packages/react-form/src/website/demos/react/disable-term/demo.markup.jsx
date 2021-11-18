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

  const save = useCallback(() => actions.changeData({}), [actions]);

  return (<>
    <Styled.MainElement>
      <Field id="firstName" />
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

export default createForm(form)(DemoForm);`;

export default {
  exampleName: 'disable-term',
  demos: [{
    demo,
    terms: true,
  }],
};
