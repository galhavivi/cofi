---
id: test
title: Test Cofi
sidebar_label: Test Cofi
---

After defining a page that uses cofi, there are few recommended ways to test cofi in the page.

## Recommended Tests

### Verify Form Definition

Verify form definition is valid. Its very useful when upgrading major version to verify that configuration is still valid,
and if not to understand what need to be changed according to the given error.

Example using jest:

```javascript
import { createForm, verifyForm } from '@cofi/form';
import { model, resources, settings } from './form';

expect.extend({
  toBeValid: ({ model, resources, settings }) => {
    const form = createForm(model, resources, settings);
    let error;
    try {
      verifyForm(form);
    } catch (err) {
      error = err;
    }

    return !error ? {
      pass: true,
      message: () => `form definition is valid`,
    } : {
      pass: false,
      message: () => `expected form definition to be valid, but got error: \n${error}`,
    };
  },
});

it('form definition ok', () => {
  const form = { model, resources };
  expect(form).toBeValid();
});
```

### Handlers Unit Tests

Resources object contains custom handlers that the form will use during its lifecycle (for example validators). 
Each custom handler is a small block that can be tested via unit tests.

Example using jest:

```javascript
// lib/form/validators.js
export default { // e.g - model.fields.firstName.validators: [{ name: 'minLength', args: { value: 2 } }
  minLength: {
    func: ({ value, args }) => value >= args.value,
    message: ({ label, args }) => `${label} should have minimum length of '${args}'`,
  }
}

// tests/form/validators.spec.js
import validators from 'lib/form/validators';

describe('employee / resources / validators', () => {
  describe('minLength', () => {
    describe('func', () => {
       describe('valid', () => {
          it('value length grater than args value', () => {
            expect(validators.minLength.func({ value: 3, args: { value: 2 } })).toBeTruthy();
          });

          it('value length equals args value', () => {
            expect(validators.minLength.func({ value: 3, args: { value: 3 } })).toBeTruthy();
          });
       });

       describe('invalid', () => {
          it('value length lower than args value', () => {
            expect(validators.minLength.func({ value: 2, args: { value: 3 } })).toBeFalsy();
          });
       });     
    });

    describe('message', () => {
      it('ok', () => {
        expect(validators.minLength.message({ label: 'First Name', args: { value: 2 } }))
        .toEqual('First Name should have minimum length of 2');
      });
    });
  });
});
```

### Form Integration Tests

Use integration tests to describe and test form use cases. It provides:
- A clean and simple 'form spec' insurance, for times of:
  - Migrating to a new UI library - since Form class is agnostic to UI.
  - Migrating to a new Cofi major version - resources handler's arguments (or definition structure in general) might change between major versions. Since `verifyForm` function does not verify the resources handler's arguments data, Integration tests using Form class can help
cover all users scenarios are working correctly.
- A simple guidance for your form's new / old maintainers (especially when supporting apps which lacks of original product managers, original
developers, the existence of a real form spec and anything that can help to understand all scenarios of the form).
- No re-writing tests when migrating to a new UI library

Resources handler's arguments (or definition structure in general) might change between major versions.
Since `verifyForm` function does not verify the resources handler's arguments data, Integration tests using Form class can help
cover all users scenarios are working correctly (this can also be done via e2e).

Example of test using jest:

```javascript
import Form from '@cofi/form';

describe('Form use cases', () => {
  // define user form
  const model = {
    id: 'user-form',
    fields: {
      firstName: {
        label: 'First Name',
        path: 'firstName',
        required: true,
        validators: [{
          name: 'minLength'
          args: {
            value: 2
          }
        }],
      },
      lastName: {
        label: 'Last Name',
        path: 'lastName',
      }
    },
    data: {
      firstName: 'Ross',
      lastName: 'Geller',
    }
  };

  beforeEach(() => {
    // create user form
    const form = new Form();
    await form.init(model);

    // verify initial data
    expect(form.data).toEqual({ firstName: 'Ross', lastName: 'Geller' });
  });

  it('firstName = Monica', () => {
    // change field firstName and verify the change
    await form.changeValue('firstName', 'Monica');

    // verify form data
    expect(form.data).toEqual({ firstName: 'Monica', lastName: 'Geller' });

    // verify form is valid
    expect(form.invalid).toBeFalsy();
  });

  it('firstName = empty', () => {
    // change field firstName to empty value
    await form.changeValue('firstName', '');

    // verify form data
    expect(form.data).toEqual({ lastName: 'Geller' });

    // verify form is invalid (field 'firstName' is required)
    expect(form.invalid).toBeTruthy();
    expect(form.fields.firstName.empty).toBeTruthy();
    expect(form.fields.firstName.required).toBeTruthy();
    expect(form.fields.firstName.errors).toEqual([{
      name: 'required',
      message: 'Field required',
    }]);
  });

  it('firstName = a (min length error)', () => {
    // change field firstName to 'a'
    await form.changeValue('firstName', 'a');

    // verify form data
    expect(form.data).toEqual({ firstName: 'a', lastName: 'Geller' });

    // verify form is invalid (since field 'firstName' has minimum length)
    expect(form.invalid).toBeTruthy();
    expect(form.fields.firstName.errors).toEqual([{
      name: 'minLength',
      message: 'Minimum length is 2',
    }]);
  });
});
```


### UI Form Integration Tests

For `@cofi/react-form`, a mount to the UI `Form` component in a test can be done, followed by integration tests scenarios similar to the approach of [Form Integration Tests](test#form-integration-tests).

### Components Tests

Since Cofi uses generic component props for all of its components, a mapping layer to existing component props is required,
which should be tested.

Example - component Input using [toCofi](react-components#tocofi) hoc

```javascript
/* Input.js */
import { toCofi } from '@cofi/react-components/utils';
import Input from '@material-ui/core/Input';

export const mapper = ({ value = '', disabled = false, state = {}, onValueChange }) => ({
  type: state.type
  placeholder: state.placeholder,
  value,
  disabled,
  onChange: (e) => onValueChange(e.target.value),
});

export default toCofi(Input, mapper);
```

Using the above format saves the `react` import as well as simplify tests. 
The following code tests mapper function with a simple JavaScript test.

```javascript
/* Input.spec.js */
import React from 'react';
import { shallow } from 'enzyme';
import Input, { mapper } from './Input.js';

describe('Input', () => {
  const cofiProps = {
    state: {
      type: 'text',
      placeholder: 'Enter name...',
    },
    value: 'Rachel',
    disabled: false,
    onValueChange: jest.fn(),
  };

  const expectedInputProps = {
    type: 'text',
    placeholder: 'Enter name...',
    value: 'Rachel Green',
    disabled: false,
    onChange: expect.any(Function),
  };

  let inputProps;
  
  beforeEach(() => {
    inputProps = mapper(cofiProps);
  });
  
  describe('mapper', () => {
    it('return correct props', () => {
      expect(inputProps).toEqual(expectedInputProps);
    });

    it('call onValueChange with correct value', () => {
      const mockEvent = { target: { value: 'Ross' } };
      inputProps.onChange(mockEvent);
      expect(cofiProps.onValueChange).toHaveBeenCalledWith('Ross');
    });
  });

  describe('component', () => {
    it('renders ok', () => {
      const component = shallow(<Input {...cofiProps} />);
      expect(component.props()).toEqual(expectedInputProps);
    });
  });
});
```

### E2E Tests

Add e2e tests to verify that your UI was loaded and perform some real user changes to verify it works correctly.
We covered all `@cofi/react-form` [demos with e2e](https://github.com/galhavivi/cofi/blob/master/packages/react-form/src/website/Root.e2e.js) using [Puppeteer](https://github.com/GoogleChrome/puppeteer).
