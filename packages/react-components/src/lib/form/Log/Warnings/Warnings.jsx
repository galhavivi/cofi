/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import ReactJson from 'react-json-view';
import * as Styled from '../Styled';

const Warning = ({ message, form }) => (<>
  <h3>WARNING</h3>
  <p>{message}</p>
  {
    form && <ReactJson 
      src={form} 
      name="form" 
      displayDataTypes={false} 
      enableClipboard={false} 
      collapsed={true} />
  }
</>);

export default ({ items }) => {
  return (<Styled.Items>
    { 
      items.map((warn, index) => (<div key={index}><Warning {...warn} /></div>))
    }
  </Styled.Items>);
};
