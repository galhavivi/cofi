/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const id = '`${form.model.id}-${data.id}`'; // eslint-disable-line

const demo = `import React, { useState, useCallback } from 'react';
import { Form, Field } from '@cofi/react-form';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveButton from './custom-form-components/SaveButton';
import formEdit from './edit-form';
import formView from './view-form';
import usersList from './users';

const formEdit = cloneDeep(editForm);
const formDetails = cloneDeep(detailsForm);
const clonedUsersList = cloneDeep(usersList); // users is shared also for example code usage

const getForm = (data, orgForm) => {
  const form = cloneDeep(orgForm);
  Object.assign(form.model, { data, id: ${id} });
  return form;
};

const initialStateUsers = {};

clonedUsersList.forEach((user) => {
  initialStateUsers[user.id] = { data: user, form: getForm(user, formDetails) };
});

const App = () => {
  const [users, setUsers] = useState(initialStateUsers);
  const [editing, setEditing] = useState([]);
  
  const cancel = useCallback((userId) => {
    const newUsers = Object.assign({}, users);
    newUsers[userId].form = getForm(newUsers[userId].data, formDetails);
    const newEditing = [...editing];
    const index = newEditing.indexOf(userId);
    newEditing.splice(index, 1);

    setUsers(newUsers);
    setEditing(newEditing);
  }, [users, editing, setEditing, setUsers]);

  const edit = useCallback((userId) => {
    const newUsers = Object.assign({}, users);
    newUsers[userId].form = getForm(newUsers[userId].data, formEdit);

    setUsers(newUsers);
    setEditing([...editing, userId]);
  }, [users, setUsers, setEditing, editing]);

  const save = useCallback((user) => {
    const userId = user.id;
    const newUsers = Object.assign({}, users);
    newUsers[userId].data = user;
    newUsers[userId].form = getForm(newUsers[userId].data, formDetails);

    const newEditing = [...editing];
    const index = newEditing.indexOf(userId);
    newEditing.splice(index, 1);

    setUsers(newUsers);
    setEditing(newEditing);
  }, [users, editing, setEditing, setUsers]);


  const headerStyle = {
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '1px solid black',
    paddingBottom: '20px',
  };

  // prepare row to render
  const rows = clonedUsersList.map((orgUser) => {
    const user = users[orgUser.id].data;
    const { model, resources } = users[user.id].form;
    const isUserEditing = editing.includes(user.id);

    return (<Grid container={true} item={true} xs={12} key={user.id}>
      <Form model={model} resources={resources}>
        <Grid item={true} xs={1}>
          <Field id="id" />
        </Grid>
        <Grid item={true} xs={2}>
          <Field id="firstName" />
        </Grid>
        <Grid item={true} xs={2}>
          <Field id="lastName" />
        </Grid>
        <Grid item={true} xs={4}>
          <Field id="facebook" />
        </Grid>
        <Grid item={true} xs={3}>
          {
            isUserEditing
            && <div>
              <SaveButton onClick={(context) => { save(context.model.data); }}>Save</SaveButton>
              <Button color="primary" onClick={() => { cancel(user.id); }}>Cancel</Button>
            </div>
          }
          {
            !isUserEditing
            && <Button
              color="primary"
              onClick={() => { edit(user.id); }}>Edit</Button>
          }
        </Grid>
      </Form>
    </Grid>);
  });

  return (<Styled.MainElementLarge>
    <Grid container={true}>
      <Grid container={true} item={true} xs={12} style={headerStyle}>
        <Grid item={true} xs={1}>Id</Grid>
        <Grid item={true} xs={2}>First Name</Grid>
        <Grid item={true} xs={2}>Last Name</Grid>
        <Grid item={true} xs={4}>Facebook</Grid>
        <Grid item={true} xs={3}>Edit</Grid>
      </Grid>
      {rows}
    </Grid>
  </Styled.MainElementLarge>);
};

export default App;`;

export default {
  exampleName: 'grid-usage',
  demos: [{
    formFolder: 'edit-form',
    hideHtml: true,
  }, {
    formFolder: 'view-form',
    demo,
    extraComponents: [
      'custom-form-components/SaveButton',
    ],
  }],
};
