/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import * as utils from '../../../e2e.utils';
import { PREVIEW_DEBOUNCE_WAIT } from '../../../../lib/FormEditor/Preview/Preview';
import selectors from './selectors';

export async function verifyAll(page, state) {
  // wait for form to finish lifecycle + preview debounce wait
  await page.waitFor(utils.COFI_LIFECYCLE + PREVIEW_DEBOUNCE_WAIT);

  if (!state.config.disableCheck) {
    // verify config json
    await verifyJsonView(page, selectors.edit.config.jsonView, state.config.json);

    // verify fields grid rows
    let gridRows = await page.$$(selectors.edit.config.fieldsRows);
    const fields = state.config.json && state.config.json.model ? state.config.json.model.fields || {} : {};
    expect(gridRows).toHaveLength(Object.keys(fields).length);

    // verify layouts grid rows
    gridRows = await page.$$(selectors.edit.config.layoutsRows);
    const layouts = state.config.json ? state.config.json.layouts || {} : {};
    expect(gridRows).toHaveLength(Object.keys(layouts).length);

    // verify config save disabled / enabled
    await verifySaveDisabled(page, selectors.edit.config.save, state.config.saveDisabled);

    // verify if config is blocked
    const configBlocker = await page.$(selectors.edit.config.blocker);
    state.config.blocked ? expect(configBlocker).toBeTruthy() : expect(configBlocker).toBeFalsy();
  }
  
  // verify edit field display
  const editField = await page.$(selectors.edit.field.wrapper);
  if (!state.field.display) {
    expect(editField).toBeFalsy();
  } else {
    expect(editField).toBeTruthy();

    // verify field json
    await verifyJsonView(page, selectors.edit.field.jsonView, state.field.json);

    // verify field save disabled / enabled
    await verifySaveDisabled(page, selectors.edit.field.save, state.field.saveDisabled);
  }

  // verify edit layout display
  const editLayout = await page.$(selectors.edit.layout.wrapper);
  if (!state.layout.display) {
    expect(editLayout).toBeFalsy();
  } else {
    expect(editLayout).toBeTruthy();

    // verify layout json
    await verifyJsonView(page, selectors.edit.layout.jsonView, state.layout.json);
   
    // verify layout save disabled / enabled
    await verifySaveDisabled(page, selectors.edit.layout.save, state.layout.saveDisabled);
  }

  // verify preview playground display
  const playground = await page.$(selectors.edit.preview.playground);
  if (!state.playground.display) {
    expect(playground).toBeFalsy();
  } else {
    expect(playground).toBeTruthy();

    // verify playground title (All / Relevant fields)
    const title = await page.$eval(selectors.edit.preview.tabs, e => e.innerText);
    expect(title).toEqual(state.field.display ? 'PLAYGROUND (RELEVANT)' : 'PLAYGROUND (ALL)' );

    // verify preview fields
    const fields = await page.$$(selectors.edit.preview.playgroundFields);
    expect(fields).toHaveLength(state.playground.fields);

    // verify edited field label in the playground
    if (state.field.display && state.field.json.component && state.field.json.label) {
      const selector = `${selectors.edit.preview.playground} [id="${state.field.json.id}"] > div:first-child > div:first-child`;
      const label = await page.$eval(selector, e => e.innerText);
      expect(label).toEqual(state.field.json.label.toUpperCase());
    }
    
    if (state.playground.json) {
      // config - click show json
      await showJson(page, selectors.edit.preview);

      // verify preview json
      await verifyJsonView(page, selectors.edit.preview.jsonView, state.playground.json);

      // config - click close json
      await showJson(page, selectors.edit.preview);
    }
  }

  // verify preview log display
  const log = await page.$(selectors.edit.preview.log.wrapper);
  expect(log).toBeTruthy();

  // verify records
  let logTabs = await page.$eval(selectors.edit.preview.log.tabs, e => e.innerText);
  expect(logTabs).toContain(`Error (${state.log.error})`); // missing fields error
  expect(logTabs).toContain(`Warn (${state.log.warn})`);
  expect(logTabs).toContain(`Debug (${state.log.debug})`);

  // clear log
  await page.$eval(selectors.edit.preview.log.clear, e => e.click());
  logTabs = await page.$eval(selectors.edit.preview.log.tabs, e => e.innerText);
  expect(logTabs).toContain('Error (0)'); 
  expect(logTabs).toContain('Warn (0)');
  expect(logTabs).toContain('Debug (0)');
}

export async function showJson(page, selector) {
  await page.click(selector.options.menu);
  await page.waitFor(utils.ANIMATION_DURATION);
  await page.click(selector.options.showJson);
}

export async function fillHandler(page, id, child, selector = '') {
  await utils.selectFromDropdown(page, id, child, selector);
  if (child === 1) { // first child is 'custom'
    await utils.inputTypeText(page, 
      `${selectors.edit.field.wrapper} div[id="${id}"] ${selector} input[placeholder="Custom name"]`,
      'someCustomName');
  }
  // add args
  await addArgs(page, id, selector);
}

export async function addArgs(page, id, selector) {
  // turn switch on
  const toggle = await page.$(`div[id="${id}"] ${selector} [class="MuiSwitch-root"]`);
  // should be fixed if we put the switch in a different div without positions
  await utils.clickOnElementAtPosition(page, toggle, 5, 5);
  // add args in the box
  await utils.jsonEditorTypeText(page,
    `${selectors.edit.field.wrapper} div[id="${id}"] ${selector} [name="outer-box"]`, '{ "a": "b"');
  await page.waitFor(utils.COFI_LIFECYCLE);
}

async function verifyJsonView(page, selector, expectedJson) {
  const jsonString = await page.$eval(selector, e => e.getAttribute('value'));
  const json = JSON.parse(jsonString);
  expect(json).toEqual(expectedJson);
}

async function verifySaveDisabled(page, selector, disabled) {
  const configSaveDisabled = disabled ? '[disabled]' : ':not([disabled])';
  const save = await page.$(`${selector}${configSaveDisabled}`);
  expect(save).toBeTruthy();
}
