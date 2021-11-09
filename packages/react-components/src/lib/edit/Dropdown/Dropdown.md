<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    friends: {
      label: 'Best Friend',
      path: 'bestFriend',
      component: {
        name: 'Dropdown',
        state: {
            items: [{
                value: '1',
                label: 'Ross Geller'
            }, {
                value: '2',
                label: 'Monica Geller'
            }, {
                value: '3',
                label: 'Rachel Green'
            }, {
                value: '4',
                label: 'Chandler Bing'
            }, {
                value: '5',
                label: 'Joey Tribbiani'
            }, {
                value: '6',
                label: 'Phoebe Buffay'
            }]
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
      bestFriend: '2', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    Dropdown: {
      renderer: Dropdown,
    },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='friends' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState('BASKETBALL');
const [state, setState] = React.useState({
  items: [{
    value: 'BASKETBALL',
    label: 'Basketball'
  }, {
    value: 'FOOTBALL',
    label: 'Football'
  }, {
    value: 'SHOP',
    label: 'Shop'
  }, {
    value: 'FASHION',
    label: 'Fashion'
  }, {
    value: 'COOK',
    label: 'Cook'
  }],
});

<Dropdown value={value} state={state} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
  items: [{
    value: 'BASKETBALL',
    label: 'Basketball'
  }, {
    value: 'FOOTBALL',
    label: 'Football'
  }, {
    value: 'SHOP',
    label: 'Shop'
  }, {
    value: 'FASHION',
    label: 'Fashion'
  }, {
    value: 'COOK',
    label: 'Cook'
  }],
});

<Dropdown value={value} state={state} onValueChange={setValue} />
```

<h4>Item's value as any object</h4>

```jsx
const [value, setValue] = React.useState({ type: 'hobbit', name: 'Pippin' });
const [state, setState] = React.useState({
  items: [{
    value: { type: 'hobbit', name: 'Frodo' },
    label: 'Frodo'
  }, {
    value: { type: 'hobbit', name: 'Sam' },
    label: 'Sam'
  }, {
    value: { type: 'hobbit', name: 'Pippin' },
    label: 'Pippin'
  }, {
    value: { type: 'elf', name: 'Legolas' },
    label: 'Legolas'
  }, {
    value: { type: 'dwarf', name: 'Gilmli' },
    label: 'Gilmli'
  }],
});

<Dropdown value={value} state={state} onValueChange={setValue} />
```

<h4>Required</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
  items: [{
    value: 'BASKETBALL',
    label: 'Basketball'
  }, {
    value: 'FOOTBALL',
    label: 'Football'
  }, {
    value: 'SHOP',
    label: 'Shop'
  }, {
    value: 'FASHION',
    label: 'Fashion'
  }, {
    value: 'COOK',
    label: 'Cook'
  }],
});

<Dropdown value={value} state={state} required={true} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
  items: [{
    value: 'BASKETBALL',
    label: 'Basketball'
  }, {
    value: 'FOOTBALL',
    label: 'Football'
  }, {
    value: 'SHOP',
    label: 'Shop'
  }, {
    value: 'FASHION',
    label: 'Fashion'
  }, {
    value: 'COOK',
    label: 'Cook'
  }],
});

<Dropdown value={value} state={state} disabled={true} onValueChange={setValue} />
```

<h4>Invalid</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
  items: [{
    value: 'BASKETBALL',
    label: 'Basketball'
  }, {
    value: 'FOOTBALL',
    label: 'Football'
  }, {
    value: 'SHOP',
    label: 'Shop'
  }, {
    value: 'FASHION',
    label: 'Fashion'
  }, {
    value: 'COOK',
    label: 'Cook'
  }],
});

<Dropdown value={value} state={state} invalid={true} onValueChange={setValue} />
```