/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  popper: {
    marginBottom: '10px !important',
  },
  paper: {
    maxWidth: 200,
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    bottom: '-8px',
    left: '70px',
    width: '0', 
    height: '0', 
    borderLeft: '7px solid transparent',
    borderRight: '7px solid transparent',
    borderTop: '7px solid #e5e5e5',
  },
  header: {
    borderBottom: '1px solid #e1e1e1',
    textTransform: 'uppercase',
    padding: '15px',
    fontSize: '16px !important',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  body: {
    padding: '15px',
    maxHeight: '150px',
    overflowY: 'auto',
  },
}));

export default function Popover(props) {
  const classes = useStyles();
  const [targetRef, setTargetRef] = React.useState(props.targetRef.current ? props.targetRef : React.createRef());

  React.useEffect(() => setTargetRef(props.targetRef.current ? props.targetRef : React.createRef()), 
    [props.targetRef]);

  const Component = props.component;

  return !targetRef.current ? (null) : (
    <Popper
      id={props.id}
      open={props.open()}
      anchorEl={targetRef.current}
      placement="top"
      className={classes.popper}
      disablePortal={true}>
      <span className={classes.arrow} />
      <Paper className={classes.paper}>
        <div className={classes.header}>{props.title}</div>
        <div className={classes.body}>
          <Component { ...(props.props || {}) } />
        </div>
      </Paper>
    </Popper>
  );
}
