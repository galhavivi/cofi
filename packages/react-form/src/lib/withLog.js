/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import React, { useContext } from 'react';
import LogContext from './LogContext';

export default (Component) => (props) => {
  const log = useContext(LogContext);
  return <Component log={log} {...props} />;
};
