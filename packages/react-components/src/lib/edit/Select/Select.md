<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    bestFriend: {
      label: 'Best Friend',
      path: 'bestFriend',
      component: {
        name: 'Select',
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
            }],
        },
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
    Select: {
      renderer: Select,
    }, 
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='bestFriend' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState('3');
const [state, setState] = React.useState({
  items:[{
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
  }],
  styles: {
    menuList: {
      maxHeight: '120px',
    },
  },
});

<Select value={value} state={state} onValueChange={setValue} />
  ```

<h4>Value as object</h4>

```javascript
const [value, setValue] = React.useState({ id: '3', first: 'Rachel', last: 'Green' });
const [state, setState] = React.useState({
    items:[{
      value: { id: '1', first: 'Ross', last: 'Geller' },
      label: 'Ross Geller'
    }, {
      value: { id: '2', first: 'Monica', last: 'Geller' },
      label: 'Monica Geller'
    }, {
      value: { id: '3', first: 'Rachel', last: 'Green' },
      label: 'Rachel Green'
    }, {
      value: { id: '4', first: 'Chandler', last: 'Bing' },
      label: 'Chandler Bing'
    }, {
      value: { id: '5', first: 'Joey', last: 'Tribbiani' },
      label: 'Joey Tribbiani'
    }, {
      value: { id: '6', first: 'Phoebe', last: 'Buffay' },
      label: 'Phoebe Buffay'
    }],
});

<Select value={value} state={state} onValueChange={setValue} />
```

<h4>Search</h4>

```javascript
const [value, setValue] = React.useState('3');
const [state, setState] = React.useState({
  searchable: true,
  items:[{
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
  }],
  styles: {
    menuList: {
      maxHeight: '120px',
    },
  },
});

<Select value={value} state={state} onValueChange={setValue} />
```

<h4>Required (cant unselect)</h4>

```javascript
const [value, setValue] = React.useState('3');
const [state, setState] = React.useState({
  items:[{
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
  }],
  styles: {
    menuList: {
      maxHeight: '120px',
    },
  },
});

<Select value={value} state={state} required={true} onValueChange={setValue} />
  ```
<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState('3');
const [state, setState] = React.useState({
  items:[{
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
  }],
  styles: {
    menuList: {
      maxHeight: '120px',
    },
  },
});

<Select value={value} state={state} disabled={true} onValueChange={setValue} />
```

<h4>Value undefined</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
  items:[{
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
  }],
  styles: {
    menuList: {
      maxHeight: '120px',
    },
  },
});

<Select value={value} state={state} onValueChange={setValue} />
```