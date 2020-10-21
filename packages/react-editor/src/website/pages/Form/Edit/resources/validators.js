/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import validators from '@cofi/form/validators';

const URL_PREFIX = 'https://galhavivi.github.com/cofi/docs/validators#';

Object.keys(validators).forEach(name => 
  validators[name].detailsUrl = `${URL_PREFIX}${(name).toLowerCase()}`);

export default validators;

