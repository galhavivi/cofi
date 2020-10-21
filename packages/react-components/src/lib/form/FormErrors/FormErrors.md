<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
const Text = require('../../edit/Text/index.js').default;
const Form = require('@cofi/react-form/Form').default;
const Field = require('@cofi/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    firstName: {
      label: 'First Name',
      path: 'firstName',
      component: {
        name: 'Text',
      },
      required: true,
      validators: [{
        name: 'minLength',
        args: { value: 5 }
      }],
    },
    lastName: {
      label: 'Last Name',
      path: 'lastName',
      component: {
        name: 'Text',
      },
      required: true,
      validators: [{
        name: 'minLength',
        args: { value: 5 }
      }],
    },
  },
};

const resources = {
  components: { 
      Text: { renderer: Text }, 
  },
  terms: {
    excludeMe: {
      func: () => false, // convert to true to see the field excluded
    },
  },
};

const formStyle = { 
  margin: '30px 0 60px 0', 
  background: '#fafafa', 
  borderRadius: '20px', 
  padding: '20px' 
};

<Form model={model} resources={resources}>
  <div style={formStyle}>
    <Field id='firstName' />
    <Field id='lastName' />
  </div>
  <div>
    <FormErrors onClickField={fieldId => console.log(fieldId)} />
  </div>
</Form>
```

<h4>Usage in cofi form - check only specific fields</h4>

```javascript
const Text = require('../../edit/Text/index.js').default;
const Form = require('@cofi/react-form/Form').default;
const Field = require('@cofi/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    firstName: {
      label: 'First Name',
      path: 'firstName',
      component: {
        name: 'Text',
      },
      required: true,
      validators: [{
        name: 'minLength',
        args: { value: 5 }
      }],
    },
    lastName: {
      label: 'Last Name',
      path: 'lastName',
      component: {
        name: 'Text',
      },
      required: true,
      validators: [{
        name: 'minLength',
        args: { value: 5 }
      }],
    },
  },
};

const resources = {
  components: { 
      Text: { renderer: Text }, 
  },
  terms: {
    excludeMe: {
      func: () => false, // convert to true to see the field excluded
    },
  },
};

const formStyle = { 
  margin: '30px 0 60px 0', 
  background: '#fafafa', 
  borderRadius: '20px', 
  padding: '20px' 
};

<Form model={model} resources={resources}>
  <div style={formStyle}>
    <Field id='firstName' />
    <Field id='lastName' />
  </div>
  <div>
    <FormErrors onClickField={fieldId => console.log(fieldId)} fields={['firstName']}/>
  </div>
</Form>
```

