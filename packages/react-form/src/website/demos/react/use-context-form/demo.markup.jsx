/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useContext } from 'react';
import { createForm, FormContext, createForm } from '@cofi/react-form';
import Button from '@mui/material/Button';
import ReactJson from 'react-json-view';
import form from './form/index.js';

const DemoForm = () => {
  const { model } = useContext(FormContext);

  return (<>
    <Styled.MainElement>
      <Field id="name" />
      <Field id="lastName" />
      <div id="errors-summary">
        <h4>Errors summary:</h4>
        {
          Object.keys(model.errors).map(fieldId => (<ul key={fieldId}>
            { model.errors[fieldId].map((error, index) => 
              <li key={index}>Error in {model.fields[fieldId].label}: {error.message}</li>) }
          </ul>))
        }
      </div>
    </Styled.MainElement>
    <Styled.MainElement>
      <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
    </Styled.MainElement>
  </>);
};

export default createForm(form)(DemoForm);`;

export default {
  exampleName: 'use-context-form',
  demos: [{
    demo,
  }],
};
