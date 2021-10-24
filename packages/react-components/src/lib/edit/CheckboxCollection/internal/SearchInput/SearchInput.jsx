import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
};

const SearchInput = ({ value, placeholder, disabled, classes, onChange, onSearch }) => {

  const onChangeClick = useCallback((e) => onChange(e.target.value), [onChange]);

  const onSearchIconClick = useCallback(() => onSearch(value), [onSearch, value]);

  const onKeyPress = useCallback((e) => {
    if (e.charCode === 13) {
      onSearch(value);
    }
  }, [onSearch, value]);

  return (<Paper className={classes.root} elevation={1}>
    <InputBase
      type="search"
      className={classes.input}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChangeClick}
      onKeyPress={onKeyPress}
    />
    <IconButton
      className={classes.iconButton}
      disabled={disabled}
      aria-label="Search"
      onClick={onSearchIconClick}
    >
      <SearchIcon />
    </IconButton>
  </Paper>);
};

SearchInput.defaultProps = {
  value: '',
  placeholder: undefined,
  disabled: false,
  onChange: noop,
  onSearch: noop,
};

SearchIcon.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

export default withStyles(styles)(SearchInput);
