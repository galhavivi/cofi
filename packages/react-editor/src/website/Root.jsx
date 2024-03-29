/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import ReactDOM from 'react-dom';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { setLogLevel, logLevels } from '@cofi/form';
import Styled from './Styled';
import Home from './pages/Home';
import FormList from './pages/Form/List';
import FormEdit from './pages/Form/Edit';
import FieldList from './pages/Field/List';
import FieldEdit from './pages/Field/Edit';

const generateClassName = createGenerateClassName({ productionPrefix: 'cofi-react-editor' });

const theme = createTheme({
  palette: {
    primary: {
      main: '#3fcee6',
    },
    secondary: {
      main: '#828c93',
    },
  },
});

// set cofi log level to debug (to see it also on prod docs website)
setLogLevel(logLevels.DEBUG);

const Root = () => {
  return ( 
    <HashRouter basename="/">
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Styled.GlobalStyle />
          <Styled.Header>
            <Styled.InternalLink id="logo" to="/">
              <Styled.Logo src={require('./logo.svg').default} />
              <Styled.LogoText>Cofi | React Editor</Styled.LogoText>
            </Styled.InternalLink>
            <Styled.HeaderLinks>
              <Styled.ExternalLink href={process.env.REACT_APP_COFI_DOCS}>Docs</Styled.ExternalLink>
              <Styled.ExternalLink href={process.env.REACT_APP_COFI_GIT}>GitHub</Styled.ExternalLink>
            </Styled.HeaderLinks>
          </Styled.Header>
          <Styled.Main id="cofi-react-editor-demos">
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/form/:id" component={FormEdit} />
              <Route exact={true} path="/form/" component={FormList} />
              <Route exact={true} path="/field/:id" component={FieldEdit} />
              <Route exact={true} path="/field/" component={FieldList} />
            </Switch>
          </Styled.Main>
        </ThemeProvider>
      </StylesProvider>
    </HashRouter>
  );
};

if (document.getElementById('root')) {
  ReactDOM.render(<Root />, document.getElementById('root'));
  if (module.hot) { module.hot.accept(); }
}

export default Root;
