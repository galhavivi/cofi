/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useState, useCallback } from 'react';
import { Form, Field } from '@cofi/react-form';
import Button from '@material-ui/core/Button';
import DataViewer from './custom-form-components/DataViewer';
import formEdit from './edit-form';
import formView from './view-form';

const DemoForm = () => {
  const [edit, setEdit] = useState(false);
  const [config, setConfig] = useState(formEdit);

  const change = useCallback(() => {
    setEdit(!edit);
    setConfig(edit ? formEdit : formView);
  }, [edit, formView, formEdit]);
  return (<>
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
  </>);
};

export default DemoForm;`;

export default {
  exampleName: 'change-form-definition',
  demos: [{
    title: 'Edit Form',
    data: true,
    formFolder: 'edit-form',
    hideHtml: true,
  }, {
    title: 'View Form',
    data: true,
    formFolder: 'view-form',
    demo,
    extraComponents: [
      'custom-form-components/DataViewer',
    ],
  }],
};

