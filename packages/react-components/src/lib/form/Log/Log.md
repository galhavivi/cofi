<h3>Examples</h3>

<h4>Display form log messages</h4>

```javascript
import { LogProvider, withLog } from '@cofi/react-form';
import { setLogLevel, logLevels } from '@cofi/form';
import Text from '../../edit/Text';
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

// set cofi log level to debug (to see it also on prod docs website)
setLogLevel(logLevels.DEBUG);

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
