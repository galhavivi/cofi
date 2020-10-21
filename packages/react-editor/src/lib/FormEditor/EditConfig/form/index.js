/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import components from './components';
import validators from './validators';
import conversions from './conversions';
import fields from './fields';
import { validatorForm } from './fields/validators';
import { termForm } from './fields/terms';
import { conversionForm } from './fields/conversions';
import { dependenciesChangeForm } from './fields/dependenciesChanges';
import { componentForm } from './fields/components';

export const model = {
  id: 'edit-form',
  fields,
};

export const resources = {
  components,
  validators,
  conversions,
  validatorForm,
  termForm,
  conversionForm,
  dependenciesChangeForm,
  componentForm,
};

export default { model, resources };
