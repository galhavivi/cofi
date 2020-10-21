import data from './data';
import fields from './fields';
import components from './components';
import validators from './validators';
import conversions from './conversions';
import terms from './terms';
import dependenciesChanges from './dependencies-changes';
import hooks from './hooks';
import context from './context';

const model = {
  id: 'overall',
  data,
  fields,
  context,
};

const resources = {
  components,
  validators,
  conversions,
  terms,
  dependenciesChanges,
  hooks,
};

export default { model, resources };
