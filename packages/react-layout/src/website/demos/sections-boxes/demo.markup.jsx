
/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React, { useContext, useMemo } from 'react';
import { FormContext, createForm } from '@cofi/react-form';
import { iterateSections, getSectionComponentBoxes } from '@cofi/react-layout/Section/utils';
import Section from '@cofi/react-layout/Section';
import sections from './sections';
import form from './form';

const Demo = () => {
  const { model } = useContext(FormContext);

  // filter empty sections (if all of the section's fields are excluded)
  const filteredSections = useMemo(() => filterEmptySections(sections, model), [model]);

  if (filteredSections.length === 0) {
    return null;
  }

  return (
    <Styled.ItemWrapper>
      {
        filteredSections.map((section, index) => (<Section key={section.id} {...section} />))
      }
    </Styled.ItemWrapper>);
};

function filterEmptySections(sections = [], model) {
  const newSections = sections.map(s => ({ ...s }));
  return newSections.filter((section) => {
    const renderSections = filterEmptySections(section.sections, model);
    if (renderSections.length) {
      section.sections = renderSections;
    }
    return !(shouldExcludeSection(section, model)) || section.sections;
  });
}

function shouldExcludeSection(section, model) {
  const boxes = getSectionComponentBoxes(section);
  const fieldIds = boxes.map(box => box.props.id);
  const excluded = fieldIds
    .reduce((excluded, fieldId) => excluded && model.fields[fieldId].excluded, true);
  return excluded;
}

export default createForm(form)(Demo);
`;

export default {
  exampleName: 'sections-boxes',
  demo,
  data: true,
};
