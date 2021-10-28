/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { FormContext, createField } from '../lib';
 
  
export const CustomFieldView = ({ onValueChange, onStateChange }) => (<div>
  <button data-testid="value-change" onClick={() => onValueChange('2')} />
  <button data-testid="state-change" onClick={() => onStateChange({ a: 2 })} />
</div>);

const MockFieldView = jest.fn(CustomFieldView);
const Field = createField(MockFieldView);

export const testField = (name, Field, FieldView) => {
  describe(name, () => {
    let context;
    let wrapper;
    let component;
    let expectedProps;
  
    beforeEach(() => {
      context = {
        model: {
          id: 'test-form',
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
        actions: {
          changeValue: jest.fn(),
          changeState: jest.fn(),
        },
      };
  
      wrapper = ({ children }) => (<FormContext.Provider value={context}>{children}</FormContext.Provider>);
  
      expectedProps = {
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
        onValueChange: expect.any(Function),
        onStateChange: expect.any(Function),
        required: false,
        state: context.model.fields.firstName.component.state,
        value: context.model.fields.firstName.component.value,
      };
 
    });
  
    it('rendered correctly', async () => {
      await act(async () => { component = render(<Field id="firstName" />, { wrapper }); });
      expect(FieldView).toHaveBeenCalledWith(expectedProps, {});
  
      fireEvent.click(component.getByTestId('value-change'));
      expect(context.actions.changeValue).toHaveBeenCalledWith('firstName', '2');
  
      fireEvent.click(component.getByTestId('state-change'));
      expect(context.actions.changeState).toHaveBeenCalledWith('firstName', { a: 2 });
    });
  
    it('rendered correctly with unsupported cofi field props - pass it to the underline component', async () => {
      await act(async () => { component = render(<Field id="firstName" mickey="mouse" />, { wrapper }); });
      expectedProps.mickey = 'mouse';
      expect(FieldView).toHaveBeenCalledWith(expectedProps, {});
    });
  
    it(`rendered correctly with reserved cofi field view prop - `
    + `don't pass it to the underline component, pass the cofi props`, async () => {
      await act(async () => { component = render(<Field id="firstName" value="mouse" />, { wrapper }); });
      expect(FieldView).toHaveBeenCalledWith(expectedProps, {});
    });
  
    it(`rendered correctly with reserved cofi field view prop that is undefined - `
       + `dont pass it to the underline component, pass the cofi props`, async () => {
      context.model.fields.firstName.component.value = undefined;
      await act(async () => { component = render(<Field id="firstName" value="mouse" />, { wrapper }); });
      expectedProps.value = context.model.fields.firstName.component.value;
      expect(FieldView).toHaveBeenCalledWith(expectedProps, {});
    });

    it('render new field view - when prop has changed', async () => {
      await act(async () => { component = render(<Field id="firstName" />, { wrapper }); });
      expect(FieldView).toHaveBeenCalledWith(expectedProps, {});
      
      context.model.fields.firstName.label = 'new label';
      await act(async () => { component.rerender(<Field id="firstName" />, { wrapper }); });
      expectedProps.label = context.model.fields.firstName.label;
      expect(FieldView).toHaveBeenCalledWith(expectedProps, {});
    });

    it('render new field view - when custom prop has changed', async () => {
      await act(async () => { component = render(<Field id="firstName" mickey="mouse" />, { wrapper }); });
      expectedProps.mickey = 'mouse';
      expect(FieldView).toHaveBeenCalledWith(expectedProps, {});
      
      await act(async () => { component.rerender(<Field id="firstName" mickey="cat" />, { wrapper }); });
      expectedProps.mickey = 'cat';
      expect(FieldView).toHaveBeenCalledWith(expectedProps, {});
    });
  });
};

testField('createField', Field, MockFieldView);
