<h3>Examples</h3>

<h4>Display form log messages</h4>

```javascript
const { LogProvider, withLog } = require('@cofi/react-form/index');
const Text = require('../../edit/Text/index.js').default;
const Form = require('@cofi/react-form/Form').default;
const Field = require('@cofi/react-form/Field').default;

const CofiLog = withLog(Log);

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

const style = { 
  margin: '30px 0 60px 0', 
  background: '#fafafa', 
  borderRadius: '20px', 
  padding: '20px' 
};

<>
<div style={style}>
  <Form model={model} resources={resources}>
    <Field id='firstName' />
    <Field id='lastName' />
  </Form>
</div>
<LogProvider settings={{ debugMaxLength: 50, errorMaxLength: 30, warnMaxLength: 30 }}>
  <CofiLog />
</LogProvider>
</>
```
