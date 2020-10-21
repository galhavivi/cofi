import React, { useContext } from 'react';
import ReactJson from 'react-json-view';
import { FormContext } from '../../../../../lib';

export default () => {
  const { model } = useContext(FormContext);
  return (<ReactJson src={model.data} name="data" displayDataTypes={false} enableClipboard={false} />);
};
