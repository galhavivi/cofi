<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    firstName: {
      label: 'First Name',
      path: 'firstName',
      component: {
        name: 'Text',
      }
    },
  },
  data: {
      firstName: 'Rachel', 
  },
};

const resources = {
  components: { 
    Text: {
      renderer: Text,
    }, 
  }
};

<Form model={model} resources={resources}>
    <Field id='firstName' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState('Rachel Green');

<Text value={value} />
```
