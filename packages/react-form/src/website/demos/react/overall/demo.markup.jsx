/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import { Field, createField, createForm, FormContext } from '@cofi/react-form';
import formDefinition from './form';

// custom field view
const Wrapper = styled.div\`
  margin-bottom: 40px;
\`;

const CustomFieldView = ({ id, label, value, excluded, component: Component }) => 
  (!excluded && <Wrapper id={id}>🌴 {label}: 
    <Component value={value} />
  </Wrapper>);

const CustomField = createField(CustomFieldView);

// form persistency - load model from the local storage
const getFormDefinition = () => {
  const localStorageKey = 'cofi-overall-form';
  const form = cloneDeep(formDefinition);

  // Retrieve the model from storage
  const prevModelStringify = localStorage.getItem(localStorageKey);
  if (prevModelStringify) {
    form.model = JSON.parse(prevModelStringify);
  }

  return form;
};

const Demo = () => {
  const { model, actions } = useContext(FormContext);

  const save = async () => {
    const result = await actions.submit();
    if (result) {
      actions.changeData({});
    }
  };

  const changeRole = () => actions.changeContext({ userRole: model.context.userRole === 'NORMAL' ? 'ADMIN' : 'NORMAL' });

  return (<>
      <div aria-label="Form">
        <div aria-label="Fields">
          <CustomField id="id" />
          <Field id="name" />
          <Field id="hobbies" />
        </div>
        <div aria-label="Footer">
          <Button 
            oonClick={changeRole}
            aria-label="Role" 
            color="primary">{model.context.userRole}</Button>
          <Button 
            onClick={actions.reset}
            aria-label="Reset" 
            color="primary">Reset</Button>
          <Button 
            disabled={!model.dirty || model.invalid || model.processing}
            onClick={save}
            aria-label="Save" 
            color="primary" 
            variant="contained">Save</Button>
        </div>
      </div>
      <div aria-label="Data Viewer">
        <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />    
      </div>
      <div aria-label="Actions">
        <div onClick={() => actions.changeValue('name', undefined)}>
          <span><b>Name</b> = empty</span><span>shows required message</span>
        </div>
        <div onClick={() => actions.changeValue('name', 'R')}>
          <span><b>Name</b> = 'R'</span><span>shows minLength validation error</span>
        </div>
        <div onClick={() => actions.changeValue('name', 'Ross')}>
          <span><b>Name</b> = 'Ross'</span><span>shows custom async validation error</span>
        </div>
        <div onClick={async () => { await actions.changeValue('name', 'Joey'); await actions.submit(); }}>
          <span><b>Name</b> = 'Joey' + <b>Save</b></span><span>shows submit validation error</span>
        </div>
        <div onClick={() => actions.changeValue('name', 'Carol')}>
          <span><b>Name</b> = 'Carol'</span><span>excludes <b>Hobbies</b></span>
        </div>
        <div onClick={() => actions.changeValue('name', 'Suzan')}>
          <span><b>Name</b> = 'Suzan'</span><span>disables <b>Hobbies</b></span>
        </div>
        <div onClick={() => actions.changeValue('name', 'Ben')}>
          <span><b>Name</b> = 'Ben'</span><span>requires <b>Hobbies</b></span>
        </div>
        <div onClick={() => actions.changeValue('name', 'Emily')}>
          <span><b>Name</b> = 'Emily'</span><span>parses view value to data value 'Rachel'</span>
        </div>
        <div onClick={() => actions.changeValue('name', 'Monica')}>
          <span><b>Name</b> = 'Monica'</span><span>clears <b>Hobbies</b> search filter and sets only 'Cook'</span>
        </div>
        <div onClick={changeRole}>
          <span><b>Admin View</b> = true</span><span>includes <b>Id</b> field (user info is not part of the form)</span>
        </div>
        <div onClick={() => actions.changeState('hobbies', { ...model.fields.hobbies.component.state, 
          search: { ...model.fields.hobbies.component.state.search, value: 'ball' } })}>
          <span><b>Hobbies Search</b> = 'ball'</span><span>changes state and filters items</span>
        </div>
        <div>
          <span><b>Id</b></span><span>has custom field view</span>
        </div>
        <div onClick={() => {
          location.reload(); // eslint-disable-line
        }}>
          <span><b>Page Refresh</b></span><span>preserves last Form state</span>
        </div>
        <div onClick={save}>
          <span><b>Save</b></span><span>clears the form</span>
        </div>
        <div onClick={actions.reset}>
          <span><b>Reset</b></span><span>loads initial data</span>
        </div>
        <div>
          <span><b>Log</b></span><span>uses custom logger</span>
        </div>
      </List>
  </>);
};

const form = getFormDefinition();
export default createForm(form)(Demo);`;

export default {
  exampleName: 'overall',
  demos: [{
    demo,
    data: true,
    mockService: true,
    context: true,
    conversions: true,
    dependenciesChanges: true,
    hooks: true,
    terms: true,
    validators: true,
  }],
};
