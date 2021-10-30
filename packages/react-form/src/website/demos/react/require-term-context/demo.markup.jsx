/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useCallback, useContext, useState } from 'react';
import { createForm, FormContext, createForm } from '@cofi/react-form';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import form from './form/index';


const DemoForm = ({ onSwitchUser }) => {
  const { model, actions } = useContext(FormContext);

  const save = useCallback(() => actions.changeData({}), [actions]);

  return (<>
    <Styled.MainElement>
      <Button className="switch-user" color="secondary" variant="contained" 
        onClick={onSwitchUser}>Switch User</Button>
      <h4 className="logged-in-user">Current User: {model.context.userType}</h4>
      <Field id="mergeReason" />
      <Styled.FormFooter>
        <Button disabled={!model.dirty || model.invalid || model.processing} onClick={save}
          aria-label="Save" color="primary" variant="contained">Save</Button>
      </Styled.FormFooter>
    </Styled.MainElement>
    <Styled.MainElement>
      <ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />
    </Styled.MainElement>
  </>);
};

const MyForm = createForm(form)(DemoForm);

const App = () => {
  const [appData, setAppData] = useState({ userType: 'NORMAL' });

  const switchUser = useCallback(() => setAppData({ userType: appData.userType === 'ADMIN' ? 'NORMAL' : 'ADMIN' }),
    [appData, setAppData]);

  return (<MyForm onSwitchUser={switchUser} context={appData} />);
};

export default App;`;

export default {
  exampleName: 'require-term-context',
  demos: [{
    demo,
  }],
};
