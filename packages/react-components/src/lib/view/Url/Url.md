<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
import Form from '@cofi/react-form/Form';
import Field from '@cofi/react-form/Field';

const model = {
  id: 'simple',
  fields: {
    facebookUrl: {
      label: 'Facebook Url',
      path: 'facebookUrl',
      component: {
        name: 'Url',
      },
      validators: [{
        name: 'url',
      }],
    },
  },
  data: {
    facebookUrl: 'https://www.facebook.com/friends.tv/',
  },
};

const resources = {
  components: { 
    Url: {
      renderer: Url,
    },
  }
};

<Form model={model} resources={resources}>
    <Field id='facebookUrl' />
</Form>
```

<h4>Simple</h4>

```javascript
const [value, setValue] = React.useState('https://www.facebook.com/friends.tv/');

<Url value={value} />
```

<h4>With label and target</h4>

```javascript
const [value, setValue] = React.useState('https://www.facebook.com/friends.tv/');
const [state, setState] = React.useState({
    label: 'Friends facebook page',
    target: '_self',
});

<Url value={value} state={state} />
```

<h4>Max lines</h4>

```javascript
const initialValue = 'https://www.facebook.com/friends.tv/aslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefo';

const [value, setValue] = React.useState(initialValue);
const [state, setState] = React.useState({
  maxLines: 3,
});

<Url value={value} state={state} />
```
