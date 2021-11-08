<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    age: {
      label: 'Age',
      path: 'age',
      component: {
        name: 'Number',
        state: {
            placeholder: 'Enter Age',
            min: 0,
        }
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
    age: 18, // remove to see initial value undefined, and required error
  }
};

const resources = {
  components: { 
    Number: {
      renderer: Number,
    },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='age' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState(8);
const [state, setState] = React.useState({
    placeholder: 'Enter Number',
    min: 0,
    max: 10,
    step: 1,
    endAdornment: '$',
});

<Number value={value} state={state} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
    placeholder: 'Enter Number',
    min: 0,
    max: 10,
    step: 1,
    endAdornment: '$',
});

<Number value={value} state={state} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState(42);
const [state, setState] = React.useState({
    placeholder: 'Enter Number',
    min: 0,
    max: 10,
    step: 1,
    endAdornment: '$',
});

<Number value={value} state={state} disabled={true} onValueChange={setValue} />
```

<h4>Invalid</h4>

```javascript
const [value, setValue] = React.useState(42);
const [state, setState] = React.useState({
    placeholder: 'Enter Number',
    min: 0,
    max: 10,
    step: 1,
    endAdornment: '$',
});

<Number value={value} state={state} invalid={true} onValueChange={setValue} />
```