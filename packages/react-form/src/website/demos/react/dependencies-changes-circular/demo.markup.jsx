/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useContext } from 'react';
import { createForm, FormContext, createForm } from '@cofi/react-form';
import ReactJson from 'react-json-view';
import form from './form/index.js';

const DemoForm = () => {
  const { model } = useContext(FormContext);

  return (
    <React.Fragment>
      <Styled.MainElement>
        <Field id="first" />
        <Field id="second" />
      </Styled.MainElement>
      <Styled.MainElement>
        <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </Styled.MainElement>
    </React.Fragment>);
}

export default createForm(form)(DemoForm);`;

export default {
  exampleName: 'dependencies-changes-circular',
  demos: [{
    demo,
    dependenciesChanges: true,
  }],
};
