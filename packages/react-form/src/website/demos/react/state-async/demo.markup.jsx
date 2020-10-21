/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React from 'react';
import { createForm, FormContext, createForm } from '@cofi/react-form';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import form from './form/index.js';

class Demo extends React.Component {
  static contextType = FormContext;

  render() {
    return (<div>
      <div>
        <Field id="hobbies" />
        <Button disabled={this.context.model.invalid} onClick={this.reset}>Reset</Button>
      </div>
      <div>
        <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </div>
    </div>);
  }

  reset = () => {
    this.context.actions.reset();
  }
}

export default createForm(form)(Demo);`;

export default {
  exampleName: 'state-async',
  demos: [{
    demo,
    data: true,
    mockService: true,
  }],
};
