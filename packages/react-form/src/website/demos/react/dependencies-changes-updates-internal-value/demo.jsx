/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import { createForm, FormContext, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import form from './form';

const DemoForm = () => {
  const { model, actions } = useContext(FormContext);

  const save = useCallback(() => actions.changeData({}), [actions]);

  return (
    <React.Fragment>
      <Styled.MainElement>
        <Field id="name" />
        <Styled.FormFooter>
          <Button disabled={!model.dirty || model.invalid
            || model.processing} onClick={save}
          aria-label="Save" color="primary" variant="contained">Save</Button>
        </Styled.FormFooter>
      </Styled.MainElement>
      <Styled.MainElement>
        <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </Styled.MainElement>
    </React.Fragment>);
};

export default createForm(form)(DemoForm);
