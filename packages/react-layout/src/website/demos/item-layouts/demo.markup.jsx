/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { FormContext, createForm } from '@cofi/react-form';
import { iterateSections, getSectionComponentBoxes } from '@cofi/react-layout/Section/utils';
import { iterateBoxes } from '@cofi/react-layout/Box/utils';
import SaveIcon from '@material-ui/icons/Save';
import Item from '@cofi/react-layout/Item';
import FormErrors from '@cofi/react-components/form/FormErrors';
import form from './form';
import sections from './sections';

const layouts = ['scroll', 'tabs', 'mobile', 'undefined'];

const sizes = [4, 3, 2, 1];

const getSectionId = (fieldId) => {
  let sectionId;

  iterateSections(sections, (section) => {
    iterateBoxes(section.boxes, (box) => {
      if (box.props && box.props.id === fieldId) {
        sectionId = section.id;
      }
    });
  });

  return sectionId;
};

const Demo = () => {
  const { model } = useContext(FormContext);
  const [size, setSize] = useState(4);
  const [layout, setLayout] = useState('scroll');
  const [selected, setSelected] = useState();

  const handleChangeLayout = useCallback((e) => setLayout(e.target.value), []);

  const handleChangeSize = useCallback((e) => setSize(Number(e.target.value)), []);

  const mainActions = useMemo(() => ([{
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
    onClick: () => console.log('Save', model.data), // eslint-disable-line
    popover: {
      title: 'Handle Fields',
      open: () => model.invalid,
      component: FormErrors,
      props: {
        onClickField: (fieldId) => setSelected({ sectionId: getSectionId(fieldId), elementId: fieldId }),
      },
    },
  }]), [model.data, model.dirty, model.invalid, model.processing]);

  const optionsActions = useMemo(() => ([{
    label: 'Archive',
    onClick: () => console.log('Archive', model.data), // eslint-disable-line
  }, {
    label: 'History',
     onClick: () => console.log('History', model.data), // eslint-disable-line
    exclude: () => model.data.department === 'HR',
  }, {
    label: 'Report To HR',
    onClick: () => console.log('Report To HR', model.data), // eslint-disable-line
    disable: () => model.data.department === 'HR',
  }, {
    label: 'Delete',
    onClick: () => console.log('Delete', model.data), // eslint-disable-line
  }]), [model.data]);

  useEffect(() => {
    // apply exclude condition to sections - exclude section if all of its fields are excluded
    iterateSections(sections, (section) => {
      section.exclude = () => {
        const boxes = getSectionComponentBoxes(section);
        const fieldIds = boxes.map(box => box.props.id);
        const excluded = !fieldIds.find(fieldId => !model.fields[fieldId].excluded);
        return excluded;
      };
    });
  }, [model.fields]);

  return (<>
    <div id="layout-select">
      <StyledSpan>Layout:</StyledSpan>
      {layouts.map(currLayout => (
        <FormControlLabel
          key={currLayout}
          value={currLayout}
          label={currLayout}
          labelPlacement="end"
          aria-checked={currLayout === layout}
          control={<Radio color="primary" checked={currLayout === layout} onChange={handleChangeLayout} />}
        />))}
    </div>
    <div id="size-select">
      <StyledSpan>Size:</StyledSpan>
      {sizes.map(currSize => (
        <FormControlLabel
          key={currSize}
          value={currSize}
          label={currSize}
          labelPlacement="end"
          aria-checked={currSize === size}
          control={<Radio color="primary" checked={currSize === size} onChange={handleChangeSize} />}
        />))}
    </div>
    <Styled.ItemWrapper>
      <Item 
        title="Employee"
        layout={layout === 'undefined' ? undefined : layout}
        size={size}
        sections={sections}
        selected={selected}
        mainActions={mainActions}
        optionsActions={optionsActions} />
    </Styled.ItemWrapper>
  </>);
};

export default createForm(form)(Demo);`;

export default {
  exampleName: 'item-layouts',
  demo,
  data: true,
};
