/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext, useMemo } from 'react';
import { FormContext, createForm } from '@cofi/react-form';
import SaveIcon from '@material-ui/icons/Save';
import ReactBreakpoints, { Media } from 'react-breakpoints';
import Item from '../../../lib/Item';
import Styled from '../../components/StyledComponents';
import sections from './sections';
import sectionsMobile from './sections-mobile';
import form from './form';


const Demo = () => {
  const { model } = useContext(FormContext);

  const mainActions = useMemo(() => [{
    label: 'Cancel',
    type: 'tertiary',
    onClick: () => console.log('Cancel', model.data), // eslint-disable-line
  }, {
    label: 'Save & Close',
    type: 'secondary',
    disable: () => !model.dirty || model.invalid || model.processing,
    onClick: () => console.log('Save & Close', model.data), // eslint-disable-line
  }, {
    label: 'Save',
    type: 'primary',
    icon: SaveIcon,
    disable: () => !model.dirty || model.invalid || model.processing,
    onClick: () => console.log('Save & Close', model.data), // eslint-disable-line
  }], [model.data, model.dirty, model.invalid, model.processing]);

  const optionsActions = useMemo(() => [{
    label: 'Archive',
    onClick: () => {},
  }, {
    label: 'History',
    onClick: () => {},
    exclude: () => model.data.department === 'HR',
  }, {
    label: 'Report To HR',
    onClick: () => {},
    disable: () => model.data.department === 'HR',
  }, {
    label: 'Delete',
    onClick: () => {},
  }], [model.data]);

  const sizes = useMemo(() => ({
    mobile: {
      size: 320,
      item: {
        title: 'Employee',
        layout: 'mobile',
        sections: sectionsMobile,
        mainActions,
        optionsActions,
      },
    },
    desktop: {
      size: 1200,
      item: {
        title: 'Employee',
        layout: 'scroll',
        sections,
        mainActions,
        optionsActions,
      },
    },
  }), [mainActions, optionsActions]);

  const reactBreakpoints = {};
  Object.keys(sizes).forEach((key) => {
    reactBreakpoints[key] = sizes[key].size;
  });

  return (<Styled.ItemWrapper>
    <ReactBreakpoints breakpoints={reactBreakpoints} debounceResize={true} debounceDelay={200}>
      <Media>
        {({ currentBreakpoint }) => <Item { ...sizes[currentBreakpoint].item } />}
      </Media>
    </ReactBreakpoints>
  </Styled.ItemWrapper>);
};

export default createForm(form)(Demo);
