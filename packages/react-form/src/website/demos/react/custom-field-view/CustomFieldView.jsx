/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import noop from 'lodash/noop';
import styled from 'styled-components';

const Field = styled.div`
  margin-bottom: 40px;
`;

export default ({
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
  component = noop,
  onValueChange = noop,
  onStateChange = noop,
  ...customProps
}) => {
  if (excluded) return null;

  const Component = component;

  return (
    <Field id={id} className="field">
      {
        label && <div className="field-label"><span>🌴</span>{label}</div>
      }
      {
        Component && <div className="field-component" aria-label="Component">
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
        description && <div className="field-description"><span>☝</span>{description}</div>
      }
      {
        errors.map(error => (<div key={error.name} className="field-error">
          <span>😡</span>{error.message}</div>))
      }
    </Field>
  );
};
