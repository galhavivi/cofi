/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import { Form, Field, FormContext } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import form from './form';

class InternalForm extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <React.Fragment>
        <Styled.MainElement>
          <h3>Fetching data: { this.props.isLoading ? 'Loading.........' : 'Done!' }</h3>
          <Styled.SectionTitle>First Section</Styled.SectionTitle>
          <Field id="id" />
          <Styled.SectionTitle>Second Section</Styled.SectionTitle>
          <Field id="name" />
          <Field id="hobbies" />
          <Styled.FormFooter>
            <Button disabled={this.context.model.invalid} onClick={this.reset}
              aria-label="Reset" color="primary">Reset</Button>
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

  reset = () => {
    // Note: using 'this.context.actions.reset()' will reset form
    // to the data it received when the form was initialized - i.e empty data 
    this.context.actions.changeData(this.props.serverData);
  }

  save = () => {
    console.log('Saving data to the server...', this.context.model.data); // eslint-disable-line
  }
}

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: form.model,
      resources: form.resources,
      isLoading: true,
    };

    // mock fetch data from the server
    setTimeout(() => {
      const data = {
        id: '123456',
        name: 'Rachel Green',
        hobbies: ['FASHION', 'SHOP'],
      };

      // updating the data reference - will make the form to call changeData action
      this.setState({ data, isLoading: false });
    }, 1000);
  }

  render() {
    return (<React.Fragment>
      <Form model={this.state.model} resources={this.state.resources} data={this.state.data}>
        <InternalForm isLoading={this.state.isLoading} serverData={this.state.data} />
      </Form>
    </React.Fragment>);
  }
}
