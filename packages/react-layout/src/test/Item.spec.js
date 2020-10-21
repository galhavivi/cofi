/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Item from '../lib/Item';
 
describe('Item', () => {
  let props;
 
  beforeEach(() => {
    props = {
      title: 'Employee',
      sections: [{
        id: 'general',
        title: 'General',
      }],
      layout: 'scroll',
      mainActions: [],
      optionsActions: [],
    };
  });
  it('Should render - ok', () => {
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render with layout tabs - ok', () => {
    props.layout = 'tabs';
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render with layout mobile - ok', () => {
    props.layout = 'mobile';
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render without layout - ok', () => {
    props.layout = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render without title - ok', () => {
    props.title = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render with all filtered sections - ok', () => {
    props.sections[0].exclude = () => true;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render without mainActions - ok', () => {
    props.mainActions = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render with mainActions - popover - ok', () => {
    props.mainActions = [{
      label: 'Save & Close',
      type: 'secondary',
      disable: () => false,
      onClick: jest.fn(),
    }, {
      label: 'Save',
      type: 'primary',
      icon: () => null,
      disable: () => false,
      onClick: jest.fn(),
      popover: {
        title: 'Handle Fields',
        open: () => false,
        component: () => (<div>hi</div>),
        props: { onClickField: jest.fn() },
      },
    }];
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render without optionsActions - ok', () => {
    props.optionsActions = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
  
  function getComponent(props) {
    return (<Item {...props} />);
  }
});
 
