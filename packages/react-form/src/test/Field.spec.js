/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

jest.mock('../lib/FieldView');

import { Field, FieldView } from '../lib';
import { testField, CustomFieldView } from './createField.spec';
 
FieldView.mockImplementation(CustomFieldView);
 
testField('Field', Field, FieldView);
 
