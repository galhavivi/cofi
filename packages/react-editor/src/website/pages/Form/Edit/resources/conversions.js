/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import conversions from '@cofi/form/conversions';

const URL_PREFIX = 'https://galhavivi.github.com/cofi/docs/formatter-parser#';

Object.keys(conversions).forEach(name => 
  conversions[name].detailsUrl = `${URL_PREFIX}${(name).toLowerCase()}`);

export default conversions;
