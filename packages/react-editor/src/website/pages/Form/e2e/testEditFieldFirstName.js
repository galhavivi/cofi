/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import * as utils from '../../../e2e.utils';
import selectors from './selectors';
import { verifyAll, showJson } from './common';

export default async function testEditFieldFirstName(page, state) {
  // edit first name
  await editFieldFirstName(page, state);

  // cancel
  await page.click(selectors.edit.field.cancel);
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.config.blocked = false;
  state.field.display = false;
  state.field.json = undefined;
  state.field.saveDisabled = true;
  state.log.debug = 20; // destroy (6) + init (14)

  // verify all
  await verifyAll(page, state);

  // edit first name
  await editFieldFirstName(page, state);

  // save
  await page.click(selectors.edit.field.save);
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.config.json.model.fields[state.field.json.id] = state.field.json;
  delete state.field.json.id;
  state.config.blocked = false;
  state.field.display = false;
  state.field.json = undefined;
  state.field.saveDisabled = true;
  state.log.debug = 20; // destroy (6) + init (14)

  // verify all
  await verifyAll(page, state);
}

async function editFieldFirstName(page, state) {
  // click edit first name
  await page.click(`${selectors.edit.config.fieldsRows}:first-child > div:first-child a`);
  await page.waitFor(utils.COFI_LIFECYCLE);

  // click show json
  await showJson(page, selectors.edit.field);

  // verify all
  state.config.blocked = true;
  state.field.display = true;
  state.field.json = { id: 'firstName', path: 'firstName', component: { name: 'TextInput', state: { a: 'b' } } };
  await verifyAll(page, state);

  // enter label
  await utils.textFieldTypeText(page, 'label', 'First Name');
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.field.json.label = 'First Name';
  state.field.saveDisabled = false;
  await verifyAll(page, state);
}
 
