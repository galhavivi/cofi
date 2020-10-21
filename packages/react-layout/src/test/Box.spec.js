/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Box from '../lib/Box/index';

describe('Box', () => {
  const Field = () => {};
  const rowStyle = { display: 'flex', flexDirection: 'row' };
  const columStyle = { display: 'flex', flexDirection: 'column' };
  it('Should render component - ok', () => {
    const props = {
      component: () => {},
      props: { id: 'firstName' },
    };
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render box with style, ok', () => {
    const props = {
      style: rowStyle,
      boxes: [
        { component: Field, props: { id: 'firstName' } },
        { component: Field, props: { id: 'lastName' } },
      ],
    };
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render nested boxes, ok', () => {
    const props = {
      style: rowStyle,
      boxes: [{
        style: columStyle,
        boxes: [
          { component: Field, props: { id: 'firstName' } },
          { component: Field, props: { id: 'lastName' } },
        ],
      }, {
        style: columStyle,
        boxes: [
          { component: Field, props: { id: 'address' } },
        ],
      }],
    };
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  function getComponent(props) {
    return (<Box {...props} />);
  }
});
