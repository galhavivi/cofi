/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

const ITEM_HEIGHT = 48;

export default function ActionsMenu({ options = [], data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (option, index) => {
    option.onClick(data, index);
    handleClose();
  };

  return (
    <div>
      <Fab
        aria-label="actions"
        color="secondary"
        size="small"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Fab>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {
          options.map((option, index) => { 
            const Icon = option.icon;
            return (
              <MenuItem key={index} onClick={() => handleAction(option)}>
                <ListItemIcon><Icon fontSize="small" /></ListItemIcon>
                <Typography variant="inherit" noWrap={true}>{ option.label }</Typography>
              </MenuItem>);
          })
        }
      </Menu>
    </div>
  );
}
