/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import * as Styled from './Styled';

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
  value: PropTypes.any,
  state: PropTypes.object,
  excluded: PropTypes.bool,
  disabled: PropTypes.bool,
  dirty: PropTypes.bool,
  required: PropTypes.bool,
  empty: PropTypes.bool,
  invalid: PropTypes.bool,
  errors: PropTypes.array,
  styleOverrides: PropTypes.string,
  onValueChange: PropTypes.func,
  onStateChange: PropTypes.func,
};

const FieldView = ({
  id = undefined,
  label = undefined,
  description = undefined,
  value = undefined,
  excluded = false,
  disabled = false,
  dirty = false,
  required = false,
  empty = false,
  invalid = false,
  errors = [],
  state = {},
  component = undefined,
  styleOverrides = undefined,
  onValueChange = noop,
  onStateChange = noop,
  ...customProps
}) => {
  if (excluded) return null;

  const Component = component;

  return (
    <Styled.Field 
      id={id}
      aria-label="Field" 
      data-disabled={disabled} 
      data-dirty={dirty} 
      data-required={required}
      data-empty={empty} 
      data-invalid={invalid}
      styleOverrides={styleOverrides}>
      {
        label && <div aria-label="Header">
          <div aria-label="Label">{label}</div>
          { required && (<div aria-label="Required">*</div>) }
          { description && (<i aria-label="Description" title={description}>?</i>) }
        </div>
      }
      {
        Component && <div aria-label="Component">
          <Component
            {...customProps}
            value={value}
            state={state}
            disabled={disabled}
            dirty={dirty}
            required={required}
            empty={empty}
            invalid={invalid} 
            onValueChange={onValueChange}
            onStateChange={onStateChange} />
        </div>
      }
      {
        errors.length > 0 && <div aria-label="Error">{errors[0].message}</div>
      }
    </Styled.Field>
  );
};

FieldView.prototype = propTypes;

export default FieldView;
