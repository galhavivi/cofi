/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import terms from '@cofi/form/terms';

const URL_PREFIX = 'https://galhavivi.github.com/cofi/docs/term#';

Object.keys(terms).forEach(name => 
  terms[name].detailsUrl = `${URL_PREFIX}${(name).toLowerCase()}`);

export default terms;
