/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import { createForm, FormContext, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import form from './form';

class App extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <React.Fragment>
        <Styled.MainElement>
          <Field id="name" />
          <Field id="hobbies" />
          <Styled.FormFooter>
            <Button disabled={!this.context.model.dirty || this.context.model.invalid
              || this.context.model.processing} onClick={this.save}
            aria-label="Save" color="primary" variant="contained">Save</Button>
          </Styled.FormFooter>
        </Styled.MainElement>
        <Styled.MainElement>
          <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
        </Styled.MainElement>
      </React.Fragment>);
  }

  save = () => {
    this.context.actions.reset();
  }
}

export default createForm(form)(App);
