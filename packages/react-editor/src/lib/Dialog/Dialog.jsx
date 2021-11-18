/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default ({ title, onCancel, onConfirm, confirmText = 'OK', cancelText = 'Cancel', 
  children }) => (<Dialog open={true} onClose={onCancel}>
  <DialogTitle>{title}</DialogTitle>
  <DialogContent>
    { typeof children === 'string' ? <DialogContentText>{children}</DialogContentText> : <>{ children }</>}
  </DialogContent>
  <DialogActions>
    <Button onClick={onCancel}>{cancelText}</Button>
    <Button onClick={onConfirm} color="primary" variant="contained">{confirmText}</Button>
  </DialogActions>
</Dialog>);
