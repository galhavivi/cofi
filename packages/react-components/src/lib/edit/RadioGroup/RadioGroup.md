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
        name: 'RadioGroup',
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
  }
};

const resources = {
  components: { 
    RadioGroup: {
      renderer: RadioGroup,
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
const [value, setValue] = React.useState('2');
const [state, setState] = React.useState({
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
});

<RadioGroup value={value} state={state} onValueChange={setValue} />
```

<h4>Inline</h4>

```javascript
const [value, setValue] = React.useState('2');
const [state, setState] = React.useState({
  inline: true,
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
});

<RadioGroup value={value} state={state} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
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
});

<RadioGroup value={value} state={state} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState('2');
const [state, setState] = React.useState({
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
});

<RadioGroup value={value} state={state} disabled={true} onValueChange={setValue} />
```

<h4>Specific Items disabled</h4>

```javascript
const [value, setValue] = React.useState('2');
const [state, setState] = React.useState({
  items: [{
          value: '1',
          label: 'Ross Geller'
      }, {
          value: '2',
          label: 'Monica Geller',
      }, {
          value: '3',
          label: 'Rachel Green',
          disabled: true,
      }, {
          value: '4',
          label: 'Chandler Bing',
          disabled: true,
      }, {
          value: '5',
          label: 'Joey Tribbiani'
      }, {
          value: '6',
          label: 'Phoebe Buffay'
      }],
});

<RadioGroup value={value} state={state} onValueChange={setValue} />
```