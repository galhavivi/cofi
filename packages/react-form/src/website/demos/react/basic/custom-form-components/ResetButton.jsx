import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { FormContext } from '../../../../../lib';

export default (props) => {
  const { model, actions } = useContext(FormContext);

  return (<Button 
    aria-label="Reset" 
    color="primary"
    disabled={model.invalid}
    onClick={actions.reset}>{props.children}
  </Button>);
};
