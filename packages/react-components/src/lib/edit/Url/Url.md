<h3>Examples</h3>

<h4>Usage in cofi form</h4>

 ```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

 const model = {
  id: 'simple',
  fields: {
    favoriteWebsite: {
      label: 'Favorite Website',
      path: 'favoriteWebsite',
      component: {
        name: 'Url',
        state: {
          placeholder: 'Enter url...',
        }
      },
      required: true,
      validators: [{
        name: 'url',
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
      favoriteWebsite: 'http://test.com', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
     Url: {
        renderer: Url,
    },  
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='favoriteWebsite' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState('http://test.com');
const [state, setState] = React.useState({
    placeholder: 'Enter URL',
});

<Url value={value} state={state} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
    placeholder: 'Enter URL',
});

<Url value={value} state={state} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
    placeholder: 'Enter URL',
});

<Url value={value} state={state} disabled={true} onValueChange={setValue} />
```

<h4>Invalid</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
    placeholder: 'Enter URL',
});

<Url value={value} state={state} invalid={true} onValueChange={setValue} />
```