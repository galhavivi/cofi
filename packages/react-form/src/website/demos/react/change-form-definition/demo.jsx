/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { Form, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import DataViewer from './custom-form-components/DataViewer';
import formEdit from './edit-form';
import formView from './view-form';

const DemoForm = () => {
  const [edit, setEdit] = useState(false);
  const [config, setConfig] = useState(formEdit);

  const change = useCallback(() => {
    setEdit(!edit);
    setConfig(edit ? formEdit : formView);
  }, [edit]);
  return (
    <React.Fragment>
      <Form model={config.model} resources={config.resources}>
        <Styled.MainElement>
          <Field id="id" />
          <Field id="firstName" />
          <Field id="lastName" />
          <Styled.FormFooter>
            <Button onClick={change}>Change Form</Button>
          </Styled.FormFooter>
        </Styled.MainElement>
        <Styled.MainElement>
          <DataViewer />
        </Styled.MainElement>
      </Form>
    </React.Fragment>);
};

export default DemoForm;
