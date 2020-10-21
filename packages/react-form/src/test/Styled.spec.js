/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import * as Styled from '../lib/Styled';

describe('Styled', () => {
  it('Field and children', async () => {
    const element = shallow(<Styled.Field><div>Mock Content</div></Styled.Field>);
    expect(element).toBeTruthy();
    expect(element.html()).toContain('Mock Content');
  });
});
