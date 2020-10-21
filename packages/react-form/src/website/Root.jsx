/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useEffect } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { createGenerateClassName, StylesProvider, ThemeProvider } from '@material-ui/styles';
import { setLogLevel, logLevels } from '@cofi/form';
import { LogProvider } from '../lib';
import Styled from './components/StyledComponents';
import Demos from './components/Demos';
import FlexOverall from './demos/flex-overall';

// StylesProvider + generateClassName fix issue of css troubles when using material ui + styled components
// show wrap this solution above the root app
const generateClassName = createGenerateClassName({
  productionPrefix: 'cofi-react-form-demos',
});

const defaultDemoRoute = '/overview/introduction';

const theme = createMuiTheme({
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
  useEffect(() => {
    const unsubscribeHashChange = window.addEventListener('hashchange', () => {
      window.parent.postMessage(location.hash, '*'); // eslint-disable-line
    });
    return () => unsubscribeHashChange && unsubscribeHashChange();
  }, []);

  return (<HashRouter basename="/">
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <LogProvider>
          <Styled.RootElement id="cofi-react-form-demos">
            <Styled.GlobalStyle />
            <Styled.Header id="header">
              <Styled.InternalLink id="logo" to={defaultDemoRoute}>
                <Styled.Logo src={require('./logo.svg')} />
                <Styled.LogoText id="logo-text">Cofi | React Form Demos</Styled.LogoText>
              </Styled.InternalLink>
              <Styled.HeaderLinks>
                <Styled.ExternalLink href={process.env.REACT_APP_COFI_DOCS}>Docs</Styled.ExternalLink>
                <Styled.ExternalLink href={process.env.REACT_APP_COFI_GIT}>GitHub</Styled.ExternalLink>
              </Styled.HeaderLinks>
            </Styled.Header>
            <Route exact={true} path="/" render={shouldRedirect} />
            <Route 
              path="/overall" 
              render={FlexOverall} />
            <Route 
              path="/:levelA/:levelB" 
              render={props => (<Styled.Wrapper id="demos"><Demos match={props.match} /></Styled.Wrapper>)} />
            {shouldRedirect()}
          </Styled.RootElement>
        </LogProvider>
      </ThemeProvider>
    </StylesProvider>
  </HashRouter>);
};

const shouldRedirect = () => {
  const paths = location && location.hash && location.hash.split('/'); //eslint-disable-line
  if (paths && paths[0] !== '' && paths.length === 2) {
    return (<Redirect to={defaultDemoRoute} />);
  }
  return null;
};

if (document.getElementById('root')) {
  ReactDOM.render(<Root />, document.getElementById('root'));

  // hot reload
  if (module.hot) { module.hot.accept(); }
}

export default Root;
