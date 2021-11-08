<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    vacationDays: {
      label: 'Vacation Days',
      path: 'vacationDays',
      component: {
        name: 'Number',
      }
    },
  },
  data: {
      vacationDays: 12,
  },
};

const resources = {
  components: { 
    Number: {
      renderer: Number,
    },
  }
};

<Form model={model} resources={resources}>
    <Field id='vacationDays' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState(14556.678);
const [state, setState] = React.useState({
    fixed: 2,
    template: '$NUMBER $',
});

<Number value={value} state={state} />
```
