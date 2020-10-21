/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import * as utils from '../../../e2e.utils';
import selectors from './selectors';
import { verifyAll, showJson } from './common';
import testCreateFieldFirstName from './testCreateFieldFirstName';
import testCreateFieldLastName from './testCreateFieldLastName';
import testEditFieldFirstName from './testEditFieldFirstName';
import testCreateLayout from './testCreateLayout';
import testEditLayout from './testEditLayout';

export async function testCreateNewForm(page) {
  await page.waitFor(utils.ANIMATION_DURATION);

  // verify we are in home page
  let homeWrapper = await page.$(selectors.home.wrapper);
  expect(homeWrapper).toBeTruthy();

  // click button - go to forms
  await page.click(selectors.home.actions.forms);

  // verify we are in form list page
  let formListWrapper = await page.$(selectors.list.wrapper);
  expect(formListWrapper).toBeTruthy();
  
  // verify form list page has no forms
  let formsGridRows = await page.$$(selectors.list.rows);
  expect(formsGridRows).toHaveLength(0);

  // click logo - go to home
  await page.click(selectors.logo);

  // verify we are in home page
  homeWrapper = await page.$(selectors.home.wrapper);
  expect(homeWrapper).toBeTruthy();

  // click button - init forms
  await page.click(selectors.home.actions.initDB);

  // click button - go to forms
  await page.click(selectors.home.actions.forms);

  // verify we are in form list page
  formListWrapper = await page.$(selectors.list.wrapper);
  expect(formListWrapper).toBeTruthy();

  // verify form list page has 1 form
  formsGridRows = await page.$$(selectors.list.rows);
  expect(formsGridRows).toHaveLength(1);

  // click create new from
  page.click(selectors.list.create);
  await page.waitFor(utils.ANIMATION_DURATION);

  // verify we are on create form page
  const formEditWrapper = await page.$(selectors.edit.wrapper);
  expect(formEditWrapper).toBeTruthy();
  
  // config - click show json
  await showJson(page, selectors.edit.config);
  
  // verify all
  const state = {
    config: { json: {}, saveDisabled: true, blocked: false },
    field: { display: false, json: undefined, saveDisabled: true },
    layout: { display: false, json: undefined, saveDisabled: true },
    playground: { display: false, json: undefined, fields: 0 },
    log: { error: 1, warn: 0, debug: 0 }, // errors - missing fields
  };

  await verifyAll(page, state);
 
  // enter form id - "test-form"
  await utils.textFieldTypeText(page, 'id', 'test-form');
  state.config.json.model = { id: 'test-form' };
  
  // verify all
  await verifyAll(page, state);

  // enter form data
  await utils.jsonEditorTypeText(page, `${selectors.edit.config.wrapper} [id="data"]`, '{ "firstName": "Ross"');
  state.config.json.model.data = { firstName: 'Ross' };
  
  await verifyAll(page, state);

  // enter form settings
  await utils.textFieldTypeText(page, 'changeValueDebounceWait', '1');
  await utils.textFieldTypeText(page, 'changeValueDebounceMaxWait', '1');
  await utils.textFieldTypeText(page, 'changeStateDebounceWait', '1');
  await utils.textFieldTypeText(page, 'changeStateDebounceMaxWait', '1');
  state.config.json.settings = { 
    changeValueDebounceWait: 1,
    changeValueDebounceMaxWait: 1,
    changeStateDebounceWait: 1,
    changeStateDebounceMaxWait: 1,
  };
  state.log.error = 1; // errors - missing fields
  
  await verifyAll(page, state);

  // add field first name
  await testCreateFieldFirstName(page, state);

  // save form - not working - the click on the save is stuck
  const save = await page.$(selectors.edit.config.save);
  await save.click();
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify list of forms
  const gridRows = await page.$$(selectors.list.rows);
  expect(gridRows).toHaveLength(2); // employee and test-form

  // click on edit that form
  await page.click(`${selectors.list.rows}:nth-child(2) ${selectors.list.rowActionsButton}`);
  await page.waitFor(utils.ANIMATION_DURATION);
  await page.click(`${selectors.list.rowActionsMenu}:last-child li:nth-child(1)`);
  await page.waitFor(utils.COFI_LIFECYCLE);

  // config - click show json
  await showJson(page, selectors.edit.config);
  
  // verify all
  state.config.json.id = 'test-form';
  state.config.saveDisabled = true;
  state.log.debug = 12;
  await verifyAll(page, state);

  // add field last name - and test refresh persists form
  await testCreateFieldLastName(page, state);

  // edit field first name
  await testEditFieldFirstName(page, state);

  // add layout
  await testCreateLayout(page, state);

  // edit layout
  await testEditLayout(page, state);
}
