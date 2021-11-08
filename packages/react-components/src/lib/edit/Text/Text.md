<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    firstName: {
      label: 'First Name',
      path: 'firstName',
      component: {
        name: 'Text',
        state: {
            maxLength: 30,
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
      firstName: 'Rachel', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    Text: {
        renderer: Text,
    }, 
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='firstName' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState('Rachel Green');
const [state, setState] = React.useState({
placeholder: 'Enter Name',
});

<Text value={value} state={state} onValueChange={setValue} />
```

<h4>Multiline</h4>

```javascript
const initialValue = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

const [value, setValue] = React.useState(initialValue);
const [state, setState] = React.useState({
    placeholder: 'Enter Name',
    multiline: true,
    maxRows: 4,
});

<Text value={value} state={state} onValueChange={setValue} />
```

<h4>Initial value undefined</h4>

```javascript
const [value, setValue] = React.useState();
const [state, setState] = React.useState({
    placeholder: 'Enter Name',
});

<Text value={value} state={state} onValueChange={setValue} />
```

<h4>Disabled</h4>

```javascript
const [value, setValue] = React.useState('Rachel Green');
const [state, setState] = React.useState({
    placeholder: 'Enter Name',
});

<Text value={value} state={state} disabled={true} onValueChange={setValue} />
```

<h4>Invalid</h4>

```javascript
const [value, setValue] = React.useState('Rachel Green');
const [state, setState] = React.useState({
    placeholder: 'Enter Name',
});

<Text value={value} state={state} invalid={true} onValueChange={setValue} />
```