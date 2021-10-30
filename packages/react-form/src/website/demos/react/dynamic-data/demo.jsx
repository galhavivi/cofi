/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useContext, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { createForm, FormContext, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import form from './form';
import mockUsers from './users';

const userStyle = { width: '150px', display: 'inline-block' };

const DemoForm = () => {
  const [users, setUsers] = useState(mockUsers);
  const [editingIndex, setEditingIndex] = useState();
  const { model, actions } = useContext(FormContext);

  const save = useCallback(() => {
    const newUsers = [...users];

    if (editingIndex !== undefined) {
      newUsers[editingIndex] = model.data;
    } else {
      newUsers.push(model.data);
    }

    setUsers(newUsers);
    setEditingIndex();
    actions.changeData({});
  }, [actions, users, setUsers, editingIndex, setEditingIndex, model.data]);

  const edit = useCallback((user, index) => {
    // for more complicated forms that includes fields with states - replace the entire form definition instead changeData
    actions.changeData(user);
    setEditingIndex(index);
  }, [actions, setEditingIndex]);

  return (<>
    <Styled.MainElement>
      {
        users.map((user, index) => (<p key={user.firstName} aria-label="User">
          <span style={userStyle}>{index + 1}. {user.firstName} {user.lastName} </span>
          <Button onClick={() => edit(user, index)} aria-label="Edit" color="primary">Edit</Button>
        </p>))
      }
    </Styled.MainElement>
    <Styled.MainElement>
      <Styled.SectionTitle>User</Styled.SectionTitle>
      <Field id="firstName" />
      <Field id="lastName" />
      <Field id="address" />
      <Styled.FormFooter>
        <Button disabled={!model.dirty || model.invalid || model.processing} onClick={save}
          aria-label="Save" color="primary" variant="contained">Save</Button>
      </Styled.FormFooter>
    </Styled.MainElement>
  </>);
};

export default createForm(form)(DemoForm);
