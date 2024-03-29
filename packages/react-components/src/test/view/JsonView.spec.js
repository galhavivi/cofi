/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import JsonView from '../../lib/view/JsonView/index';

describe('<JsonView />', () => {
  let component;
  const value = { name: 'Rachel' };

  beforeEach(() => {
    component = shallow(
      getComponent(value),
    );
  });
  it('should render provided data', () => {
    expect(component).toMatchSnapshot();
  });

  function getComponent(value) {
    return (
      <JsonView value={value} />
    );
  }
});
