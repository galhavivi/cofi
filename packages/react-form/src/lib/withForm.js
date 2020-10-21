/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import React, { useContext } from 'react';
import FormContext from './FormContext';

export default (Component) => (props) => {
  const form = useContext(FormContext);
  return <Component {...props} form={form} />;
};
