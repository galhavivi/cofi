<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    person: {
      label: 'Person',
      path: 'person',
      component: {
        name: 'JsonView',
      }
    },
  },
  data: {
      person: { 
        firstName: 'Rachel',
        lastName: 'Green', 
      }, 
  },
};

const resources = {
  components: { 
    JsonView: {
      renderer: JsonView,
    }, 
  }
};

<Form model={model} resources={resources}>
    <Field id='person' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState({ 
  firstName: 'Rachel',
  lastName: 'Green', 
});

<JsonView value={value} />
```
