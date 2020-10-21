
/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React from 'react';
import { Form, Field } from '@cofi/react-form';
import DataViewer from './custom-form-components/DataViewer';
import SaveButton from './custom-form-components/SaveButton';
import ResetButton from './custom-form-components/ResetButton';
import form from './form';

export default () => (
  <Form model={form.model} resources={form.resources}>
    <div>
      <h2>First Section</h2>
      <Field id="id" />
      <h2>Second Section</h2>
      <Field id="name" />
      <Field id="hobbies" />
      <ResetButton>Reset</ResetButton>
      <SaveButton>Save</SaveButton>
    </div>
    <div>
      <DataViewer />
    </div>
  </Form>)
}`;

export default {
  exampleName: 'basic',
  demos: [{
    demo,
    data: true,
    extraComponents: [
      'custom-form-components/ResetButton',
      'custom-form-components/SaveButton',
      'custom-form-components/DataViewer',
    ],
  }],
};
