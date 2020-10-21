/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import ReactJson from 'react-json-view';
import Link from '@material-ui/core/Link';
import * as Styled from '../Styled';

const UnknownError = ({ error }) => (<>
  <h3>UNKNOWN ERROR</h3>
  <div>{error.toString()}</div>
</>);

const CofiError = ({ error }) => (<>
  <h3>{error.code.replace(/_/g, ' ')}</h3>
  <p>{error.message}. <Link href={error.reference} target="_blank">More info.</Link></p>
  { 
    error.form && <ReactJson 
      src={error.form} 
      name="form" 
      displayDataTypes={false} 
      enableClipboard={false} 
      collapsed={true} />
  }
  { 
    error.data && <ReactJson 
      src={error.data} 
      name="data" 
      displayDataTypes={false} 
      enableClipboard={false} 
      collapsed={true} />
  }
</>);

const flatError = (error) => {
  const errors = [];
  let currError = error;
  while (currError) {
    errors.push(currError);
    currError = currError.subError;
  }
  return errors;
};

export default ({ items }) => {
  const errors = [];
  items.forEach(error => Array.prototype.push.apply(errors, flatError(error)));

  return (<Styled.Items>
    { 
      errors.map((error, index) => {
        const Error = error.constructor.name === 'CofiError' ? CofiError : UnknownError;
        return (<div key={index}><Error error={error} /></div>);
      })
    }
  </Styled.Items>);
};
