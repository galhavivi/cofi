import components from './components';
import fields from './fields';
import validators from './validators';

const model = {
  id: 'validators-dependencies',
  fields,
};

const resources = {
  components,
  validators,
};

export default { model, resources };
