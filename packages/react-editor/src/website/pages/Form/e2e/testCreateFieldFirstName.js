/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import * as utils from '../../../e2e.utils';
import selectors from './selectors';
import { verifyAll, showJson, fillHandler } from './common';
 
export default async function testCreateFieldFirstName(page, state) {
  // click create new field
  await page.click(selectors.edit.config.addField);
  await page.waitFor(utils.ANIMATION_DURATION);
   
  // click show json
  await showJson(page, selectors.edit.field);
 
  // verify all
  state.config.blocked = true;
  state.field.display = true;
  state.field.json = {};
  state.log.error = 1; // errors - missing fields
  await verifyAll(page, state);
 
  // enter field id
  await utils.inputTypeText(page, `${selectors.edit.field.wrapper} div[id="id"] input`, 'firstName');
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.field.json.id = 'firstName';
  state.log.error = 1; // errors - missing field path
 
  // verify all
  await verifyAll(page, state);
 
  // enter field path
  await utils.inputTypeText(page, `${selectors.edit.field.wrapper} div[id="path"] input`, 'firstName');
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.field.json.path = 'firstName';
  state.field.saveDisabled = false;
  state.playground.display = true;
  state.log.error = 0;
  state.log.debug = 11; // init
 
  // verify all
  await verifyAll(page, state);
 
  // add component
  await fillHandler(page, 'component', 21);
   
  // verify all
  state.field.json.component = { name: 'TextInput', state: { a: 'b' } };
  state.log.debug = 18; // destroy (6) + init
  state.playground.fields = 1; // showing first name (relevant fields)
  await verifyAll(page, state);
 
  // save field
  await page.waitFor(utils.COFI_LIFECYCLE);
  await page.click(selectors.edit.field.save);
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.config.saveDisabled = false;
  state.config.json.model.fields = { [state.field.json.id]: state.field.json };
  delete state.field.json.id;
  state.config.blocked = false;
  state.field.display = false;
  state.field.json = undefined;
  state.field.saveDisabled = true;
  state.log.debug = 18; // destroy (6) + init (11)
 
  // verify all
  await verifyAll(page, state);
}
 
