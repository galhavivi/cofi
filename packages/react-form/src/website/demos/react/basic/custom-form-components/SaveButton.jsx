import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { FormContext } from '../../../../../lib';

export default (props) => {
  const { model } = useContext(FormContext);

  const save = () => console.log('Saving data to the server...', model.data); // eslint-disable-line

  return (<Button 
    aria-label="Save" 
    color="primary" 
    variant="contained"
    disabled={!model.dirty || model.invalid || model.processing}
    onClick={save}>{props.children}
  </Button>);
};
