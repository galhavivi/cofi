/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { mapFieldToProps } from '@cofi/form';
import FormContext from './FormContext';

export default function createField(FieldView) {

  const Field = ({ id, ...customProps }) => {
    const [cachedProps, setCachedProps] = useState();
    const [cachedFieldView, setCachedFieldView] = useState((null));
    const { model, resources, actions } = useContext(FormContext);
    
    // we dont use "useMemo" since its not doing deep compare if id / model / resources changes
    const props = { ...customProps, ...mapFieldToProps(id, model, resources) };
  
    // optimization prevent un-necessary field view renders
    // we dont use "useEffect" here since its not doing deep compare if props changes
    if (!isEqual(props, cachedProps)) {
      setCachedProps(props);
      setCachedFieldView(<FieldView
        {...customProps}
        {...props}
        onValueChange={value => actions.changeValue(id, value)}
        onStateChange={state => actions.changeState(id, state)}
      />);
    }

    return cachedFieldView;
  };
  
  Field.propTypes = {
    id: PropTypes.string.isRequired,
  };

  return Field;
}
