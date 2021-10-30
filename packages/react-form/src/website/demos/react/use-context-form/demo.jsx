/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext } from 'react';
import ReactJson from 'react-json-view';
import { createForm, FormContext, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import form from './form';


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

export default createForm(form)(DemoForm);
