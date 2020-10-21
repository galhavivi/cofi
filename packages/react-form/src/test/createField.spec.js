/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import * as ReactAll from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { createField, FieldView } from '../lib';
 
const Field = createField(FieldView);
 
const test = (Field, name) => describe(name, () => {
  let context;
  let realUseContext;
   
  // Setup mock
  beforeEach(() => {
    context = {
      actions: {
        changeValue: jest.fn(),
        changeState: jest.fn(),
      },
      model: {
        fields: {
          firstName: {
            path: 'firstName',
            label: 'First Name',
            description: 'Enter first name',
            component: {
              name: 'InputText',
              value: 'RachelFormatted',
              state: { maxLength: 2 },
              ready: true,
            },
            excluded: false,
            invalid: false,
            dirty: false,
            disabled: false,
            required: false,
            empty: false,
            errors: [],
          },
        },
        data: {
          firstName: 'Rachel',
        },
      },
      resources: {
        components: {
          InputText: { renderer: jest.fn() },
        },
      },
    };

    realUseContext = ReactAll.useContext;
    ReactAll.useContext = () => context;
  });

  // Cleanup mock
  afterEach(() => {
    ReactAll.useContext = realUseContext;
  });

  it('rendered correctly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Field id="firstName" />);
    const element = renderer.getRenderOutput();
    expect(element.type).toEqual(FieldView);
    expect(element.props).toEqual({
      component: context.resources.components.InputText.renderer,
      description: context.model.fields.firstName.description,
      dirty: false,
      disabled: false,
      empty: false,
      errors: [],
      excluded: false,
      id: 'firstName',
      invalid: false,
      label: context.model.fields.firstName.label,
      onStateChange: expect.any(Function),
      onValueChange: expect.any(Function),
      required: false,
      state: context.model.fields.firstName.component.state,
      value: context.model.fields.firstName.component.value,
    });

    element.props.onValueChange('2');
    element.props.onStateChange({ a: 2 });

    expect(context.actions.changeValue).toHaveBeenCalledWith('firstName', '2');
    expect(context.actions.changeState).toHaveBeenCalledWith('firstName', { a: 2 });
  });
 
  it('rendered correctly with unsupported cofi field props - pass it to the underline component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Field id="firstName" mickey="mouse" />);
    const element = renderer.getRenderOutput();
    expect(element.props.mickey).toEqual('mouse');
  });
 
  it(`rendered correctly with reserved cofi field view prop - `
     + `don't pass it to the underline component, pass the cofi props`, () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Field id="firstName" value="mouse" />);
    const element = renderer.getRenderOutput();
    expect(element.props.value).toEqual(context.model.fields.firstName.component.value);
  });
 
  it(`rendered correctly with reserved cofi field view prop that is undefined - `
     + `dont pass it to the underline component, pass the cofi props`, () => {
    context.model.fields.firstName.component.value = undefined;
    const renderer = new ShallowRenderer();
    renderer.render(<Field id="firstName" value="mouse" />);
    const element = renderer.getRenderOutput();
    expect(element.props.value).toEqual(context.model.fields.firstName.component.value);
  });
});
 
test(Field, 'createField');

export default test;
