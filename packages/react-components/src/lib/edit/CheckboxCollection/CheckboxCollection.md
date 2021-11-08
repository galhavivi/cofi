<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    friends: {
      label: 'Friends',
      path: 'friends',
      component: {
        name: 'CheckboxCollection',
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
      friends: ['2', '3'], // remove to see initial value undefined, and required error
  },
};

const resources = {
    components: {
        CheckboxCollection: {
            renderer: CheckboxCollection,
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
const [value, setValue] = React.useState(['2', '3']);
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
    }]
});

<CheckboxCollection value={value} state={state} onValueChange={setValue} />
```


<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState(['2', '3']);
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
    }]
});

<CheckboxCollection value={value} state={state} disabled={true} onValueChange={setValue} />
```

<h4>Inline</h4>

```javascript
const [value, setValue] = React.useState(['2', '3']);
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
    }]
});

<CheckboxCollection value={value} state={state} onValueChange={setValue} />
```

<h4>Search</h4>

```javascript
const allItems = [{
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
}];

const [value, setValue] = React.useState([]);
const [state, setState] = React.useState({ 
    search: {
        value: '',
        placeholder: 'Search'
    },
    items: allItems,
});

const findItems = query => allItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

<CheckboxCollection value={value} state={state} onValueChange={setValue}
    onStateChange={updater => {
        setState(state => {
            const newState = updater({ state }); // illustrate a cofi updater
        
            return ({ ...newState, items: findItems(newState.search.value) });
        });
    }}
/>
```

<h4>Async Search</h4>

```javascript
const allItems = [{
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
}];

const [value, setValue] = React.useState([]);
const [state, setState] = React.useState({ 
    search: {
        value: '',
        placeholder: 'Search'
    },
    items: allItems,
});

const findItems = query => allItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

<CheckboxCollection value={value} state={state} onValueChange={setValue}
    onStateChange={updater => {
        setState(state => ({ ...updater({ state }), items: [] }));

        setTimeout(() => {      
            setState(state => ({ ...state, items: findItems(state.search.value) }));
        }, 700);
    }}
/>
```