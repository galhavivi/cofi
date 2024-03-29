<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    userPassword: {
      label: 'User Password',
      path: 'u',
      component: {
        name: 'Password',
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
      value: 'Im@King22385', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    Password: {
      renderer: Password,
    },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='userPassword' />
</Form>
```


<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState('Im@King22385');

<Password value={value} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();

<Password value={value} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState();

<Password value={value} disabled={true} onValueChange={setValue} />
```

<h4>Invalid</h4>

```javascript
const [value, setValue] = React.useState();

<Password value={value} invalid={true} onValueChange={setValue} />
```