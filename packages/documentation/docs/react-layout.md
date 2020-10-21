---
id: react-layout
title: Layout
sidebar_label: Layout
---

Management layout react components of `Item` and `List`, to use in your app. With `List` component 
you can define a list page for any entity in your system. `Item` component is used to define editable / viewable pages,
such as - create / edit / details entities pages - that render sections. Each section render a set of dynamic components.

In the demos we use [Cofi's Form and Field](react-form.html) components, but `@cofi/react-layout` packages does not depend on [@cofi/react-form](react-form.html). Any other component can be used in the sections. A combination of both `@cofi/react-form` and `@cofi/react-layout` can create a complete solution for management pages.

> **Note:** You can create different form page templates using the same form definition - but using different [sections](react-layout#section) definition for each view / template. For example - for 'Video' entity you might want to show different layouts / fields for different users depending on their role / permissions in the system. See [entity template](entity-templates) usage.

Layout contains the following exposed components for usage:

## Item Components

### Item

React Component that render sections that contains dynamic components, as well as title, footer with actions, menu with actions
and layout.

#### Import

```javascript
import Item from '@cofi/react-layout/Item'
```

#### Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| title | string | Text that renders at the top of the Item |
| layout | string | Represent the layout of the item. Can be one of `scroll` / `tabs` / `mobile` / undefined (default) |
| sections | required array | Array of objects. Each object can contain the data defined in [Section](react-layout#section) and [Section extend](react-layout#section-extend) |
| mainActions | array | Represent the label of the action. Its required when layout is not `mobile`. Each object can contain the data defined in [mainAction](react-layout#mainaction) |
| optionsActions | array | Represent the label of the action. Its required when layout is not `mobile`. Each object can contain the data defined in [optionAction](react-layout#optionaction) |
| size | number | Represent layout size |

#### Example

```javascript
import Item from '@cofi/react-layout/Item';
import sections from './sections';

const item = {
  title: 'Employee',
  layout: 'scroll',
  size: 2,
  sections,
  mainActions: [{
    label: 'Cancel',
    type: 'tertiary',
    onClick: () => {},
  }, {
    label: 'Save & Close',
    type: 'secondary',
    disable: () => true,
    onClick: () => {},
  }, {
    label: 'Save',
    type: 'primary',
    icon: SaveIcon,
    disable: () => true,
    onClick: () => {}
    popover: {
      title: 'Handle Fields',
      open: () => true,
      component: props => `Save alert: ${props.message}`,
      props: { 
        message: 'Please fix invalid fields',
      },
    },
  }],
  optionsActions: [{
    label: 'Archive',
    onClick: () => {},
  }, {
    label: 'History',
    onClick: () => {},
    exclude: () => false,
  }, {
    label: 'Report To HR',
    onClick: () => {},
    disable: () => false,
  }, {
    label: 'Delete',
    onClick: () => {},
  }],
};

<Item {...item} />
```

sections.js - Using css grid example:

```javascript
import { Field } from '@cofi/react-form';

const getGrid = (templateAreas) => {
  let fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
  fieldIds = [...(new Set(fieldIds))];
  return {
    templateAreas,
    templateColumns: 'repeat(3, minmax(0, 1fr))',
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component: Field, 
      props: { id },
      style: 'width: 350px;',
    })),
  };
};

export default [{
  id: 'personal-information',
  title: 'Personal Information',
  grid: getGrid([
    'firstName lastName .',
    'personalId address .',
  ]),
}, {
  id: 'job-information',
  title: 'Job Information',
  grid: getGrid([
    'department level .',
    'benefits . .',
  ]),
}, {
  id: 'raw-data',
  title: 'Raw Data',
  grid: getGrid([
    'id creationDate .',
    'modifier modificationDate .',
  ]),
  sections: [{
    id: 'raw-data-general',
    title: 'General',
    grid: getGrid([
      'id modifier .',
    ]),
  }, {
    id: 'raw-data-modification',
    title: 'Modification',
    grid: getGrid([
      'creationDate modificationDate .',
    ]),
  }],
}];
```

sections.js - Using boxes example:

```javascript
import { Field } from '@cofi/react-form';

const column = (fieldIds) => ({
  style: `
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 400px;
    margin: 0 30px 0 0;

    [aria-label="Field"] {
      margin: 0 20px 20px 0;
    }
  `,
  boxes: fieldIds.map(id => ({ component: Field, props: { id } })),
});

const row = (columns) => ({
  style: {
    display: 'flex',
    flexDirection: 'row',
  },
  boxes: columns.map(fieldIds => column(fieldIds)),
});

export default [{
  id: 'personal-information',
  title: 'Personal Information',
  boxes: [row([
    ['firstName', 'lastName'],
    ['personalId', 'address'],
  ])],
}, {
  id: 'job-information',
  title: 'Job Information',
  boxes: [row([
    ['department', 'benefits'],
    ['level'],
  ])],
}, {
  id: 'raw-data',
  title: 'Raw Data',
  boxes: [row([
    ['id', 'modifier'],
    ['creationDate', 'modificationDate'],
  ])],
  sections: [{
    id: 'raw-data-general',
    title: 'General',
    boxes: [row([
      ['id'],
      ['modifier'],
    ])],
  }, {
    id: 'raw-data-modification',
    title: 'Modification',
    boxes: [row([
      ['creationDate'],
      ['modificationDate'],
    ])],
  }],
}];

```

#### section extend

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| exclude | function | Callback function that is evaluated on render and should return `true` if currently the section should be excluded |

#### mainAction

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| label | string | Represent the label of the action. Its required when layout is not `mobile` |
| icon | function | React component that renders svg icon. Its required when layout is `mobile` |
| type | string | Represent the type of the action. Can be one of `primary` (default) / `secondary` / `tertiary` |
| onClick | function | Callback function that is called when user triggers the action |
| disable | function | Callback function that is evaluated on render and should return `true` if currently the action should be disabled |
| exclude | function | Callback function that is evaluated on render and should return `true` if currently the action should be excluded |
| popover | object | Represent popover that appears above the action. Relevant for non `mobile` layouts. Contains data defined in [popover](#popover) |

#### optionAction

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| label | required string | Represent the label of the action |
| onClick | function | Callback function that is called when user triggers the action |
| disable | function | Callback function that is evaluated on render and should return `true` if currently the action should be disabled |
| exclude | function | Callback function that is evaluated on render and should return `true` if currently the action should be excluded |

#### popover

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| title | string | Represent the title of the popover |
| open | function | Callback function that is evaluated on render and should return `true` if currently the popover should be open |
| component | function | React component to be rendered in the popover body |
| props | object | Props object to be passes to the body's component |


### Section

React Component that renders title and composition of components. 
Each composition of components can be defined using [boxes](react-layout#box) configuration or [css grid](react-layout#grid) configuration.
Each section can contain sub sections as well.

#### Import

```javascript
import Section from '@cofi/react-layout/Section'
```

#### Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| id | required string | Id of the section |
| title | string | Title the section |
| grid | object | Object contain the data defined in [Grid](react-layout.html#grid) |
| boxes | object array | Each object can contain the data defined in [Box](react-layout.html#box) |
| sections | object array | Sub sections, each object can contain the data defined in [Section](react-layout.html#sections) |
| size | number | Represent section size |

### Grid

Component represent css grid.

#### Import

```javascript
import Grid from '@cofi/react-layout/Grid'
```

#### Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| elements | required object array | Each object contains selector, gridArea, component, props, style |
| templateAreas | required string array | Represent `grid-template-areas` property in css grid |
| templateColumns | string | Represent `grid-template-columns` property in css grid |
| gap | string | Represent `grid-gap` property in css grid |

### Box

Box can be either styled box (by defining `style` object or `styled` string, `boxes` array) 
or a dynamic component (by defining `component` and `props`).

#### Import

```javascript
import Box from '@cofi/react-layout/Box'
```

#### Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| style | object / string | Style of the box element |
| boxes | array | Sub boxes |
| component | function | Dynamic react component to be rendered |
| props | object | Props to pass to the rendered component |

## List Components

`TBD` - React Component that render grid and filters components.
