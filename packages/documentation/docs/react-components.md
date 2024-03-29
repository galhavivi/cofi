---
id: react-components
title: Components
sidebar_label: Components
---

Unified api components - a set of stateless / stateful components that use the same set of props, and render real components inside (for instance - TextInput ).
Components are rendered in a generic way using [FieldView](react-field.html#field-view) component render function.
These components can serve as a mapping layer between Cofi form and other internal components (such as [Material UI](https://mui.com/) components).
Props include a number of callbacks that notify a change, such as `onValueChange`.

## Stateless Vs Stateful Components

Using stateless components in a [Field](react-field) is recommended. It enables storing the entire form state in a specific point as part of a single json object. Afterwards, the object can be used to init cofi from the same status and resume the action without interruption. (Useful for state persistence between page refreshes, form templates, debugging and etc.)

However, you can use stateful components as well, without using `state` and `onStateChange` props, and without defining `field.component.state` and `field.component.stateChange` in a [Field](react-field) definition. In that case `field.component.state` will not be updated in the form store, but instead will need state maintenance inside the component itself. 
You can still use `field.component.state` in that case as the initial state of the component.

For more info please view [stateful component](component#stateful-component) and [stateless component](component#stateless-component)

## Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| value | any | Data represented by the component. The Field will inject the value to the component from the `model.data` using the `field.path`, and will update the `model.data` with the new value that the `onValueChange` callback prop supplies |
| state | object | Current ui state of the component. The Field will inject the current ui state to the component from the `field.component.state`, and will update the `field.component.state` with the new state that the `onStateChange` callback prop supplies |
| disabled | boolean | If true, component indicates disabled (should disable all functionality and apply corresponding styling) |
| dirty | boolean | If true, component indicates dirty |
| empty | boolean | If true, component indicates empty |
| required | boolean | If true, component indicates required |
| invalid | boolean | If true, component indicates invalid. (For example, apply red border styling for component) |
| onValueChange | function | A function that propagates a new value to be changed in the form. Function's arg is a value or an updater function as described in [changeValue action](actions#changevalue) |
| onStateChange | function | A function that propagates a new ui state to be changed in the form. Function's arg is a state object or an updater function as described in [changeState action](actions#changestate) |

## Example

Simple Example

```javascript
import React from 'react';
import Input from '@mui/material/Input';

export default ({ value = '', state = {}, onValueChange }) => <Input
  value={value}
  onChange={(e) => onValueChange(e.target.value)}
  type={state.type}
  placeholder={state.placeholder}
/>
```

Advanced example

```javascript
import React from 'react';
import InternalCheckboxCollection from 'some-components-library/CheckboxCollection';

export default ({ value = [] state, disabled, invalid, onValueChange, onStateChange }) => {

  const onItemCheckChange = (e, checked) => {
    // pass a new value object to the hook
    const itemValue = e.target.value;
    const newValue = [...value];
    
    if (checked) {
      newValue.push(itemValue);
    } else {
      newValue.splice(value.indexOf(itemValue), 1);
    }

    onValueChange(newValue);
  };

  const onSearchFilterChange = (filter) => {
    // pass a new state object to the hook
    const newState = { ...state, search: { ...state.search, value: filter } };
    onStateChange(newState);
  }

  return <InternalCheckboxCollection
    search={state.search}
    items={state.items}
    inline={state.inline}
    value={value}
    disabled={disabled}
    onCheckChange={onItemCheckChange}
    onSearchChange={onSearchFilterChange}
  />;
}
```

## Utils

### toCofi

To use existing components library in a form (such as [Material UI](https://mui.com/)) -
a map from the Cofi component generic props to the existing component props is needed.

Example - using react functional component

```javascript
/* Input.js */
import React from 'react';
import Input from '@mui/material/Input';

export default ({ value = '', state = {}, disabled = false, onValueChange }) => <Input
  type={state.type}
  placeholder={state.placeholder}
  value={value}
  disabled={disabled}
  onChange={(e) => onValueChange(e.target.value)}
/>
```

Example - using toCofi HOC

```javascript
/* Input.js */
import { toCofi } from '@cofi/react-components/utils';
import Input from '@mui/material/Input';

export const mapper = ({ value = '', disabled = false, state = {}, onValueChange }) => ({
  type: state.type
  placeholder: state.placeholder,
  value,
  disabled,
  onChange: (e) => onValueChange(e.target.value),
});

export default toCofi(Input, mapper);
```

Using the above HOC saves the `react` import as well as simplify tests ([More info](test#components-tests)).

## Our Common Components

We have a collection of common components with unified api that can be used, documented here:
[common components](https://galhavivi.github.io/cofi/react-components/index.html)

For instance:
```
// import input text component
import Text from '@cofi/react-components/edit/Text'

// import text label component
import Text from '@cofi/react-components/view/Text'

```

We plan to keep `@cofi/react-component` as generic as possible. We also define all the params under state to be stringify (for example, we don't pass components or functions in the state object) - in order to keep our common components stateless to support persistency. In your project, if a custom cofi component needs a non-strigify data, you can:
  - Define a resourceId in the component state (i.e someField.component.state.resourceId = 'myExtraData').
  - Define the resource under the resources object (i.e resources.myExtraData = () => {})
  - Consume Cofi's context in the component, and get the resource from `context.resources[props.state.resourceId]`

In our common components we used [Material UI](https://mui.com/) as our base components. 
If your app uses [Material UI](https://mui.com/) along with [styled components](https://www.styled-components.com/)
like we did in our form and layout demos, you will need to wrap your app's Root component with `StylesProvider` of [Material UI](https://mui.com/)
in order to fix their class names collision that causing ui to break.

Example form our demos:

```javascript
import { createGenerateClassName, StylesProvider } from '@mui/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'cofi-react-form-demos',
});

<StylesProvider generateClassName={generateClassName}>
  <Root />
</StylesProvider>
```