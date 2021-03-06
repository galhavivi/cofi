import components from './components';
import data from './data';
import fields from './fields';
import hooks from './hooks';

const model = {
  id: 'form-persistency',
  data,
  fields,
};

const resources = {
  components,
  hooks,
};

export default { model, resources };
