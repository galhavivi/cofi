---
id: packages
title: Packages
sidebar_label: Packages
---
Cofi is built as a monorepo which includes the following packages:

## Main Packages Structure

![packages-structure](assets/packages-v1.0.0.png)

### @cofi/form
[@cofi/form](https://github.com/galhavivi/cofi/tree/master/packages/form) - contains a JavaScript form class, that can also server as a base form utility to any UI library (such as React, Angular and Vue).

Usage Example:

```javascript
import Form from '@cofi/form';

it('should update the form data on change field value ', async () => {
  const model = {
    id: 'simple',
    data: {},
    fields: {
      name: {
        path: 'name',
      },
      lastName: {
        path: 'lastName',
      },
    },
  };

  const form = new Form();
  await form.init(model);
  expect(form.data).toEqual({});
  await form.changeFieldValue('Rachel', 'name');
  expect(form.data).toEqual({
    name: 'Rachel',
  });
});
```

### @cofi/react-form
[@cofi/react-form](https://github.com/galhavivi/cofi/tree/master/packages/react-form) - contains React [Form and Field](https://galhavivi.github.com/cofi/demo-react-form.html) components. Based on `@cofi/form`. 

Usage Example: 

```javascript
import { Form, Field } from '@cofi/react-form';

const model = {...};

<Form model={model}>
  <h2>User Details</h2>
  <Field id="firstName" />
  <Field id="lastName" />
</Form>
```

### @cofi/react-components
[@cofi/react-components](https://github.com/galhavivi/cofi/tree/master/packages/react-components) - contains common [unified api components](https://galhavivi.github.com/cofi/demo-react-components.html) for form usage. Exports common components that can be added to forms.

Usage Example:
```javascript
import TextInput from '@cofi/react-components/edit/Text';

const model = {
  // ...
  fields {
    email: {
      // ...
      component: {
        name: 'myTextInput'
      }
    }
  },
};

const resources = {
  components: {
    myTextInput: { renderer: TextInput },
  }
}
```

### @cofi/react-layout
[@cofi/react-layout](https://github.com/galhavivi/cofi/tree/master/packages/react-layout) - contains React Layout components
such as [Item and List](https://galhavivi.github.com/cofi/demo-react-layout.html).

Usage Example: 

```javascript
import Item from '@cofi/react-layout/Item';

const item = {
  title: 'Edit User',
  sections: [...],
  mainActions: [...],
  optionsActions: [...],
};

<Item item={...item} />
```

### @cofi/react-editor
[@cofi/react-editor](https://github.com/galhavivi/cofi/tree/master/packages/react-editor) - contains form and layout configurations [editor](https://galhavivi.github.com/cofi/demo-react-editor.html). 

### @cofi/documentation
[@cofi/documentation](https://github.com/galhavivi/cofi/tree/master/packages/documentation) - contains [this documentation site](https://galhavivi.github.com/cofi/).