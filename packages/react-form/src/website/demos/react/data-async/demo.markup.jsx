/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Form, Field, FormContext } from '@cofi/react-form';
import Button from '@mui/material/Button';
import ReactJson from 'react-json-view';
import form from './form';

const InternalForm = ({ serverData, isLoading }) => {
  const { model, actions } = useContext(FormContext);

  const reset = useCallback(() => {
    // Note: using 'actions.reset()' will reset form
    // to the data it received when the form was initialized - i.e empty data 
    actions.changeData(serverData);
  }, [actions, serverData]);

  const save = useCallback(() => {
    console.log('Saving data to the server...', model.data); // eslint-disable-line
  }, [model.data]);

  return (<>
    <Styled.MainElement>
      <h3>Fetching data: { isLoading ? 'Loading...' : 'Done!' }</h3>
      <Styled.SectionTitle>First Section</Styled.SectionTitle>
      <Field id="id" />
      <Styled.SectionTitle>Second Section</Styled.SectionTitle>
      <Field id="name" />
      <Field id="hobbies" />
      <Styled.FormFooter>
        <Button disabled={model.invalid} onClick={reset}
          aria-label="Reset" color="primary">Reset</Button>
        <Button disabled={!model.dirty || model.invalid
          || model.processing} onClick={save}
        aria-label="Save" color="primary" variant="contained">Save</Button>
      </Styled.FormFooter>
    </Styled.MainElement>
    <Styled.MainElement>
      <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
    </Styled.MainElement>
  </>);
};

const Demo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(form.model.data);

  useEffect(() => {
    // mock fetch data from the server
    setTimeout(() => {
      const data = {
        id: '123456',
        name: 'Rachel Green',
        hobbies: ['FASHION', 'SHOP'],
      };

      // updating the data reference - will make the form to call changeData action
      setData(data);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Form model={form.model} resources={form.resources} data={data}>
      <InternalForm isLoading={isLoading} serverData={data} />
    </Form>);
}

export default Demo;`;

export default {
  exampleName: 'data-async',
  demos: [{
    demo,
  }],
};
