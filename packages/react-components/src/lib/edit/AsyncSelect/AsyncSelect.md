<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const mockServerItems = [{
  id: '1',
  name: 'Ross Geller'
}, {
  id: '2',
  name: 'Monica Geller'
}, {
  id: '3',
  name: 'Rachel Green'
}, {
  id: '4',
  name: 'Chandler Bing'
}, {
  id: '5',
  name: 'Joey Tribbiani'
}, {
  id: '6',
  name: 'Phoebe Buffay'
}];

const mockService = {
  get: (id) => {
    return new Promise(resolve => {
      const item = mockServerItems.find(x => x.id === id);
      resolve(item);
    });
  },
  search: (query) => {
    return new Promise(resolve => {
      const items = mockServerItems.filter(x => x.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
      resolve(items);
    });
  },
};

const model = {
  id: 'simple',
  fields: {
    bestFriend: {
      label: 'Best Friend',
      path: 'bestFriend',
      component: {
        name: 'AsyncSelect',
        stateChange: { name: 'friendStateChange' },
      },
      formatter: { name: 'friendFormatter' },
      parser: { name: 'friendParser' },
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
    bestFriend: '3', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    AsyncSelect: {
      renderer: AsyncSelect,
        stateChange:  (props) => {    
        // if search filter has changed - return object with cleared items and 
        // change isLoading indication to true
        if (props.prevState && (props.prevState.searchQuery !== props.state.searchQuery)) {
          return { ...props.state, items: [], isLoading: true };
        }

        // else, if isLoading changes to true,
        // begin search and return promise which resolves an object of: { items: [ ... ], isLoading: false }
        if (props.state.isLoading) {
          return new Promise((resolve) => {
            // mock server call
            mockService.search(props.state.searchQuery).then((items) => {
              const viewItems = items.map(x => { return { label: x.name, value: x.id }; });
              resolve({ ...props.state, items: viewItems, isLoading: false });
            });
          });
        }

        // else - no more changes needed
        return undefined;
      },
    },
  },
  conversions: {
    friendFormatter: {
      func: (props) => {
        return new Promise((resolve) => {
          // mock server call
          mockService.get(props.value).then((item) => {
            resolve({ label: item.name, value: item.id });
          });
        });  
      } 
    },
    friendParser: {
      func: (props) => {
        return props.value.value; // (props.value is the item { label, value })
      },
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
const serverItems = [{
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

const [value, setValue] = React.useState(serverItems[2]);
const [state, setState] = React.useState({});

const findItems = query => serverItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

<AsyncSelect
value={value}
state={state}
onValueChange={setValue}
onStateChange={updater => {
  setState(state => ({ ...updater({ state }), items: [], isLoading: true }));

  setTimeout(() => {      
    setState(state => ({ ...state, items: findItems(state.searchQuery), isLoading: false }));
  }, 700);
}}
/>
```

<h4>Value as object</h4>

```javascript
const serverItems = [{
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

const [value, setValue] = React.useState(serverItems[2]);
const [state, setState] = React.useState({});

const findItems = (query = '') => serverItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

<AsyncSelect
value={value}
state={state}
onValueChange={value => setState({ value })}
onStateChange={updater => {
  setState(state => ({ ...updater({ state }), items: [], isLoading: true }));

  setTimeout(() => {      
    setState(state => ({ ...state, items: findItems(state.searchQuery), isLoading: false }));
  }, 700);
}}
/>
  ```

<h4>Required (cant unselect)</h4>

```javascript
const serverItems = [{
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

const [value, setValue] = React.useState(serverItems[2]);
const [state, setState] = React.useState({});

const findItems = (query = '') => serverItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

<AsyncSelect
value={value}
state={state}
required={true}
onValueChange={setValue}
onStateChange={updater => {
  setState(state => ({ ...updater({ state }), items: [], isLoading: true }));

  setTimeout(() => {      
    setState(state => ({ ...state, items: findItems(state.searchQuery), isLoading: false }));
  }, 700);
}}
/>
```

<h4>Disabled</h4>

```javascript
const serverItems = [{
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

const [value, setValue] = React.useState(serverItems[2]);
const [state, setState] = React.useState({});

const findItems = query => serverItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

<AsyncSelect
value={value}
state={state}
disabled={true}
onValueChange={setValue}
onStateChange={updater => {
  setState(state => ({ ...updater({ state }), items: [], isLoading: true }));

  setTimeout(() => {      
    setState(state => ({ ...state, items: findItems(state.searchQuery), isLoading: false }));
  }, 700);
}}
/>
```

<h4>Value undefined</h4>

```javascript
const serverItems = [{
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

const [value, setValue] = React.useState();
const [state, setState] = React.useState({});

const findItems = query => serverItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

<AsyncSelect
value={value}
state={state}
onValueChange={setValue}
onStateChange={updater => {
  setState(state => ({ ...updater({ state }), items: [], isLoading: true }));

  setTimeout(() => {      
    setState(state => ({ ...state, items: findItems(state.searchQuery), isLoading: false }));
  }, 700);
}}
/>
```
