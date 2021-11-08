<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    canEdit: {
      label: 'Can Edit',
      path: 'canEdit',
      component: {
        name: 'Boolean',
      }
    },
  },
  data: {
      canEdit: true,
  },
};

const resources = {
  components: { 
    Boolean: {
        renderer: Boolean,
    }, 
  }
};

<Form model={model} resources={resources}>
    <Field id='canEdit' />
</Form>
```

<h4>Value: true</h4>

```javascript
const [value, setValue] = React.useState(true);

<Boolean value={value} />
```

<h4>Value: false</h4>

```javascript
const [value, setValue] = React.useState(false);

<Boolean value={value} />
```

<h4>Value: undefined</h4>

```javascript
const [value, setValue] = React.useState(undefined);

<Boolean value={value} />
```
