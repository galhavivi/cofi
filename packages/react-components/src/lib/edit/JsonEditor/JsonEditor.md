
<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    options: {
      label: 'Options',
      path: 'options',
      component: {
        name: 'JsonEditor',
        state: {
            height: '150px',
        }
      },
      required: true,
      validators: [{
          name: 'numberValues',
      }],
      disableTerm: {
          name: 'disableMe',
      },
      excludeTerm: {
          name: 'excludeMe',
      },
    },
  },
  data: {
      options: undefined,
  },
};

const resources = {
  components: { 
      JsonEditor: {
          renderer: JsonEditor,
      }, 
  },
  validators: {
      numberValues: {
          func: props => !Object.values(props.value).find(x => isNaN(x)),
          message: () => 'All values must be numbers',
      },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='options' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState({ height: '20px', width: '20px' });

<JsonEditor value={value} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();

<JsonEditor value={value} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState({ height: '20px', width: '20px' });

<JsonEditor value={value} disabled={true} onValueChange={setValue} />
```
