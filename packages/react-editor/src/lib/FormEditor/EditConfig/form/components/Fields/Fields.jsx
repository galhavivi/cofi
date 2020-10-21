/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { FormContext } from '@cofi/react-form';
import Grid from '../../../../../Grid';
import Dialog from '../../../../../Dialog';
import downloadJson from '../../../../../utils/downloadJson'; 
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';
import { GridWrapper } from './Styled';
import AddFromLibrary from './AddFromLibrary';


const Fields = ({ value = {}, state = {}, onValueChange, onStateChange }) => {
  const form = useContext(FormContext);
  const { showModal, addFromLibraryValue } = state;
  const setShowModal = name => onStateChange(({ state }) => ({ ...state, showModal: name }));
  const setAddFromLibraryValue = addFromLibraryValue => onStateChange(({ state }) => ({ ...state, addFromLibraryValue }));

  const setEditing = ({ id, field }) => form.actions.changeContext({
    ...form.model.context,
    edit: { type: 'field', item: { id, ...field } }, 
    preview: { type: 'field', item: { id, ...field } }, 
  });

  const add = () => setEditing({ field: {} });

  const addFromLibrary = () => setShowModal('library');

  const saveFromLibrary = () => {
    // add selected library fields to local fields
    const newValue = { ...value };
    const { fields, type } = addFromLibraryValue;
    
    fields.forEach(field => {
      const addField = { ...field };
      delete addField.id;
      if (type === 'reference') {
        addField._referenced = true;
      }
      newValue[field.id] = addField;     
    });
    onValueChange(newValue);

    // clean modal and close
    setShowModal();
    setAddFromLibraryValue();
  };

  const duplicate = ({ id }) => {
    const field = cloneDeep(value[id]);
    delete field.id;
    setEditing({ id: field.id, field });
  };

  const download = ({ id }) => {
    downloadJson(value[id], id);
  };

  const remove = ({ id }) => {
    const newValue = { ...value };
    delete newValue[id];
    onValueChange(newValue);
  };

  const data = Object.keys(value).sort().map(id => ({ id, field: value[id] }));
  const fieldsLibrary = form.model.context.fieldsLibrary;

  return (<>
    {
      showModal === 'library' && <Dialog 
        open={true}
        title="Add Fields From Library"
        confirmText="Add"
        onConfirm={saveFromLibrary} 
        onCancel={setShowModal}>
        <AddFromLibrary 
          value={addFromLibraryValue} 
          onValueChange={setAddFromLibraryValue} 
          fields={fieldsLibrary.fields}
        />
      </Dialog>
    }
    <GridWrapper>
      <Grid
        columns={columns({ setEditing })}
        data={data}
        headerActions={headerActions({ add, addFromLibrary, fieldsLibrary })}
        rowActions={rowActions({ setEditing, duplicate, download, remove })} />
    </GridWrapper> 
  </>);
};

export default Fields;
