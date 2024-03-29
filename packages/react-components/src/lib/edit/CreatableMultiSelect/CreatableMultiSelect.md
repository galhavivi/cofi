<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    keywords: {
      label: 'Keywords',
      path: 'keywords',
      component: {
        name: 'CreatableMultiSelect',
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
      keywords: ['dog', 'cat'], // remove to see initial value undefined, and required error
  }
};

const resources = {
  components: { 
    CreatableMultiSelect: {
      renderer: CreatableMultiSelect,
    }, 
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='keywords' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState(['foo', 'bar']);

<CreatableMultiSelect value={value} onValueChange={setValue} />
```