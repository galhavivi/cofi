<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    status: {
      label: 'Status',
      path: 'status',
      component: {
        name: 'Switch',
      },
      required: true,
      disableTerm: {
          name: 'disableMe',
      },
      excludeTerm: {
          name: 'excludeMe',
      },
    },
  },
  data: {
      status: true, // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    Switch: {
      renderer: Switch,
    }, 
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='status' />
</Form>
```


<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState(true);

<Switch value={value} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();

<Switch value={value} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState();

<Switch value={value} disabled={true} onValueChange={setValue} />
```
