
/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import * as utils from '../../../e2e.utils';
import selectors from './selectors';
import { verifyAll, showJson, fillHandler } from './common';

export default async function testCreateFieldLastName(page, state) {
  // click create new field
  await page.click(selectors.edit.config.addField);
  await page.waitFor(utils.ANIMATION_DURATION);
  
  // click show json
  await showJson(page, selectors.edit.field);
  
  // verify all
  state.config.blocked = true;
  state.field.display = true;
  state.field.json = {};
  state.playground.display = false;
  state.playground.fields = 0; // showing relevant fields
  state.log.error = 1; // errors - missing fields
  state.log.debug = 6; // destroy
  await verifyAll(page, state);

  // enter field id
  await utils.inputTypeText(page, `${selectors.edit.field.wrapper} div[id="id"] input`, 'lastName');
  await page.waitFor(utils.COFI_LIFECYCLE);
  
  // verify all
  state.field.json.id = 'lastName';
  state.log.error = 1; // errors - missing field path
  state.log.debug = 0;
  await verifyAll(page, state);

  // enter field path
  await utils.inputTypeText(page, `${selectors.edit.field.wrapper} div[id="path"] input`, 'lastName');
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.field.json.path = 'lastName';
  state.field.saveDisabled = false;
  state.playground.display = true;
  state.log.error = 0;
  state.log.debug = 11; // init
  await verifyAll(page, state);

  // verify field dependenciesChange not exists
  await verifyFieldMissing(page, 'dependenciesChange');

  // enter field dependencies - open dropdown
  await utils.selectFromDropdown(page, 'dependencies', 1);
  await page.waitFor(utils.COFI_LIFECYCLE);
  
  // verify all
  state.field.json.dependencies = ['firstName'];
  state.playground.fields = 1; // showing relevant fields (1 for the dependant field - first name)
  state.log.debug = 20; // destroy (6) + init (14)
  await verifyAll(page, state);

  // enter field dependenciesChange
  await fillHandler(page, 'dependenciesChange', 1);

  // verify all
  state.field.json.dependenciesChange = { name: 'someCustomName', args: { a: 'b' } };
  state.playground.display = false;
  state.log.debug = 6; // destroy (6)
  state.log.error = 1; // missing resource
  await verifyAll(page, state);

  // remove dependenciesChange
  await page.click(`${selectors.edit.field.wrapper} div[id="dependenciesChange"] [aria-label="Component"] 
  > div:first-child > div:first-child > div:first-child > div:first-child > div:nth-child(2) > div:first-child`);
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  delete state.field.json.dependenciesChange;
  state.playground.display = true;
  state.log.debug = 14; // init
  state.log.error = 0;
  await verifyAll(page, state);

  // click field required
  await page.click(`div[id="required"] input`);
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.field.json.required = true;
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // add validators
  await page.click(selectors.edit.field.addValidator);
  await fillHandler(page, 'validators', 2, '[aria-label="Component"] > div > div:nth-child(1)');
  
  // verify all
  state.field.json.validators = [{ name: 'between', args: { a: 'b' } }];
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // add disabled term
  await fillTerm(page, 'disableTerm');
  
  // verify all
  state.field.json.disableTerm = { not: true, operator: 'and', terms: [{ name: 'equals' }] };
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // add exclude term
  await fillTerm(page, 'excludeTerm');

  // verify all
  state.field.json.excludeTerm = { not: true, operator: 'and', terms: [{ name: 'equals' }] };
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // add require term
  await fillTerm(page, 'requireTerm');
  
  // verify all
  state.field.json.requireTerm = { not: true, operator: 'and', terms: [{ name: 'equals' }] };
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // enter field label
  await utils.textFieldTypeText(page, 'label', 'Last Name');
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.field.json.label = 'Last Name';
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // enter field description
  await utils.textFieldTypeText(page, 'description', 'Enter Last Name');
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.field.json.description = 'Enter Last Name';
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // verify formatter and parser are excluded
  await verifyFieldMissing(page, 'formatter');
  await verifyFieldMissing(page, 'parser');

  // add component
  await fillHandler(page, 'component', 15);
  
  // verify all
  state.field.json.component = { name: 'NumberInput', state: { a: 'b' } };
  state.log.debug = 20; // destroy (6) + init
  state.playground.fields = 2; // showing last name + first name (relevant fields)
  await verifyAll(page, state);
  
  // add formatter
  await fillHandler(page, 'formatter', 11);
  
  // verify all
  state.field.json.formatter = { name: 'toNumber', args: { a: 'b' } };
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // add parser
  await fillHandler(page, 'parser', 12);
  
  // verify all
  state.field.json.parser = { name: 'toString', args: { a: 'b' } };
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // change preview data
  await utils.textFieldTypeText(page, 'lastName', '3');
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.playground.json = { firstName: 'Ross', lastName: '3' };
  state.log.debug = 10; // change value
  await verifyAll(page, state);

  // reload page
  await page.reload();
  await page.waitFor(1500);

  // edit field - click show json
  await showJson(page, selectors.edit.field);
 
  // disable check of the config after refresh cuz the json view is closed behind blocker (json view open is not persistent)
  state.config.disableCheck = true; 
  state.log.debug = 7; // init from draft

  // verify persistency
  await verifyAll(page, state);

  // change label
  await utils.textFieldTypeText(page, 'label', '2');
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.field.json.label = 'Last Name2';
  state.playground.json = { firstName: 'Ross' };
  state.log.debug = 20; // destroy (6) + init
  await verifyAll(page, state);

  // change preview data
  await utils.textFieldTypeText(page, 'lastName', '3');
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.playground.json = { firstName: 'Ross', lastName: '3' };
  state.log.debug = 10; // change value
  await verifyAll(page, state);

  // reload page
  await page.reload();
  await page.waitFor(1500);

  // edit field - click show json
  await showJson(page, selectors.edit.field);
 
  // disable check of the config after refresh cuz the json view is closed behind blocker (json view open is not persistent)
  state.log.debug = 7; // init from draft

  // verify persistency
  await verifyAll(page, state);

  state.config.disableCheck = false;

  // save field
  await page.waitFor(utils.COFI_LIFECYCLE);
  await page.click(selectors.edit.field.save);
  await page.waitFor(utils.COFI_LIFECYCLE);

  // config - click show json
  await showJson(page, selectors.edit.config);

  state.config.json.model.fields[state.field.json.id] = state.field.json;
  delete state.field.json.id;
  state.config.blocked = false;
  state.config.saveDisabled = false;
  state.field.display = false;
  state.field.json = undefined;
  state.field.saveDisabled = true;
  state.playground.json = { firstName: 'Ross' };
  state.playground.fields = 2; // showing all fields (fields name & last name)
  state.log.debug = 20; // destroy (6) + init (14)

  // verify all
  await verifyAll(page, state);
}

async function verifyFieldMissing(page, id) {
  const field = await page.$(`div[id="${id}"]`);
  expect(field).toBeFalsy();
}

async function fillTerm(page, id) {
  // select conditional term
  await utils.selectFromDropdown(page, id, 1);
  // click not
  await page.click(`div[id="${id}"] input[type="checkbox"]`);
  // select and
  await utils.selectFromDropdown(page, id, 2, '[aria-label="Component"] > div > div:nth-child(2)');
  // click add terms
  await page.click(`div[id="${id}"] [aria-label="add-term"]`);
  // select 'equals'
  const selector = '[aria-label="Component"] > div > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2)';
  await utils.selectFromDropdown(page, id, 3, selector);
  // add args
  // await addArgs(page, id, selector);
  await page.waitFor(utils.COFI_LIFECYCLE);
}
