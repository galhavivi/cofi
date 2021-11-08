
<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    agreeToTerms: {
      label: 'Agree to site Terms',
      path: 'agreeToTerms',
      component: {
        name: 'Checkbox',
        state: {
            label: 'I read the site terms and I agree to the terms',
        }
      },
      required: true,
      validators: [{
          name: 'mustAgree',
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
      agreeToTerms: undefined,
  },
};

const resources = {
  components: { 
      Checkbox: {
          renderer: Checkbox,
      }, 
  },
  validators: {
      mustAgree: {
          func: props => props.value === true,
          message: () => 'You must agree to the terms',
      },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='agreeToTerms' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState(true);

<Checkbox value={value} onValueChange={setValue} />
```

<h4>With label</h4>

```javascript
const [value, setValue] = React.useState(true);
const [state, setState] = React.useState({ label: 'Click me' });

<Checkbox value={value} state={state} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();

<Checkbox value={value} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState(true);

<Checkbox value={value} disabled={true} onValueChange={setValue} />
```