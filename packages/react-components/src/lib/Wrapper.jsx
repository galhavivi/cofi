import React from 'react';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// fixes issue in prod of css conflicts when using material ui + styled components
const generateClassName = createGenerateClassName({ productionPrefix: 'react-app' });


const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: colors.blue[700],
  //   },
  //   secondary: {
  //     main: colors.blue[700],
  //   },
  // },
});

export default ({ children }) => (<StylesProvider generateClassName={generateClassName}>
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
</StylesProvider>);

