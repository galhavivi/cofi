<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    birthDate: {
      label: 'Birth Date',
      path: 'birthDate',
      component: {
        name: 'DateView',
        state: {
          format: 'mmm dd, yyyy',
        }
      }
    },
  },
  data: {
    birthDate: new Date(614466000000),
  },
};

const resources = {
  components: { 
    DateView,
  }
};

<Form model={model} resources={resources}>
    <Field id='birthDate' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState(new Date());

<DateView value={value} />
```
