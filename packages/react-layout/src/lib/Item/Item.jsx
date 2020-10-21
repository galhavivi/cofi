/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ItemView from '../ItemView';
import MobileItemView from '../MobileItemView';

export const layoutTypes = {
  TABS: 'tabs',
  SCROLL: 'scroll',
  MOBILE: 'mobile',
};

const Item = ({ title, layout, size, selected, sections = [], mainActions, optionsActions }) => {
  const [_rootSectionsRef] = useState(React.createRef());
  const [_selected, setSelected] = useState({}); // { sectionId, elementId }
  const [_mainActions, setMainActions] = useState(); // to keep action.ref between rendered, and popover will be shown
  const [_optionsActions, setOptionsActions] = useState();

  useEffect(() => setSelected(selected || {}), [selected]);

  useEffect(() => setMainActions(mainActions ? prepareActions(mainActions) : undefined), [mainActions]);
  useEffect(() => setOptionsActions(optionsActions ? prepareActions(optionsActions) : undefined), [optionsActions]);

  const evaluatedMainActions = _mainActions ? evaluateActions(_mainActions) : undefined;
  const evaluatedOptionsActions = _optionsActions ? evaluateActions(_optionsActions) : undefined;
  
  useEffect(() => {
    // scroll to element
    if (_selected && _selected.elementId) {
      const sections = _rootSectionsRef.current;
      sections.scrollTo({
        top: sections.querySelector(`#${_selected.elementId}`).offsetTop - sections.offsetTop - 10,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [_selected, _rootSectionsRef]);

  // filter section by exclude condition
  let evaluatedSections = evaluateSections(sections);

  if (!evaluatedSections.length) return (null);

  switch (layout) {
  case layoutTypes.MOBILE: {
    return (<MobileItemView title={title} sections={evaluatedSections} _mainActions={evaluatedMainActions}
      optionsActions={evaluatedOptionsActions} size={size} />);
  }
  default: {
    const selectedSectionId = _selected.sectionId || evaluatedSections[0].id;

    const onChangeTab = (event, selectedSectionId) => {
      setSelected({ sectionId: selectedSectionId, elementId: undefined });
  
      // if scroll layout - scroll to section
      if (layout === layoutTypes.SCROLL) {
        const section = evaluatedSections.find(x => x.id === selectedSectionId);
        section.ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // create the tabs menu items from the sections structure
    const tabs = layout ? {
      items: evaluatedSections.map(section => ({ value: section.id, label: section.title })),
      value: selectedSectionId,
      onChange: onChangeTab,
    } : undefined;
    
    // if tabs layout - show only selected tab, without title for first level section
    if (layout === layoutTypes.TABS) {
      evaluatedSections = [{ ...evaluatedSections.find(section => section.id === selectedSectionId), title: undefined }];
    }

    // prepare footer
    const footer = evaluatedMainActions ? { actions: evaluatedMainActions } : undefined;

    // prepare options
    const options = evaluatedOptionsActions ? { actions: evaluatedOptionsActions } : undefined;

    return (<ItemView title={title} tabs={tabs} sections={evaluatedSections} sectionsRef={_rootSectionsRef}
      footer={footer} options={options} size={size} />);
  }
  }
};

Item.propTypes = {
  title: PropTypes.string,
  layout: PropTypes.oneOf(Object.values(layoutTypes)),
  sections: PropTypes.array,
  selected: PropTypes.object,
  mainActions: PropTypes.array,
  optionsActions: PropTypes.array,
  size: PropTypes.number,
};

export default Item;

function evaluateSections(sections = []) {
  const newSections = sections.map(s => ({ ...s, ref: React.createRef() }));
  return newSections.filter((section) => {
    const renderSections = evaluateSections(section.sections);
    if (renderSections.length) {
      section.sections = renderSections;
    }
    return !(section.exclude && section.exclude()) || section.sections;
  });
}

function evaluateActions(actions) {
  // exclude actions, and set disabled on each render
  return actions
    .filter(action => !(action.exclude && action.exclude()))
    .map(action => Object.assign({}, action, {
      disabled: action.disable && action.disable(),
    }));
}

function prepareActions(actions) {
  // apply actions popover
  return actions.map(action => {
    if (action.popover) {
      const ref = React.createRef();
      return { ...action, elementRef: ref, popover: { ...action.popover, targetRef: ref } };
    }
    return action;
  });
}
