/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useContext, useCallback } from 'react';
import { createForm, FormContext, createForm } from '@cofi/react-form';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import form from './form/index.js';

const DemoForm = () => {
  const { model, actions } = useContext(FormContext);

  const save = useCallback(async () => {
    await actions.submit();
    await actions.changeData({});
  }, [actions]);

  return (
    <React.Fragment>
      <Styled.MainElement>
        <Field id="netflixContent" />
        <Field id="hboContent" />
        <Styled.FormFooter>
          <Button disabled={!model.dirty || model.invalid|| model.processing} onClick={save}
            aria-label="Save" color="primary" variant="contained">Save</Button>
        </Styled.FormFooter>
      </Styled.MainElement>
      <Styled.MainElement>
        <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </Styled.MainElement>
    </React.Fragment>);
}

export default createForm(form)(DemoForm);`;

export default {
  exampleName: 'convert-data',
  demos: [{
    demo,
    data: true,
    hooks: true,
    mockService: true,
  }],
};
