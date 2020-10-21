/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import * as utils from '../../../e2e.utils';
import selectors from './selectors';
import { verifyAll, showJson } from './common';

export default async function testCreateLayout(page, state) {
  // click create new layout
  await page.click(selectors.edit.config.addLayout);
  await page.waitFor(utils.ANIMATION_DURATION);

  // click show json
  await showJson(page, selectors.edit.layout);

  // verify all
  state.config.blocked = true;
  state.layout.display = true;
  state.layout.json = {};
  state.playground = { display: false, json: undefined, fields: 0 };
  await verifyAll(page, state);

  // enter layout id
  await utils.inputTypeText(page, `${selectors.edit.layout.wrapper} div[id="id"] input`, 'desktop');
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.layout.json.id = 'desktop';
  state.layout.saveDisabled = false;

  // verify all
  await verifyAll(page, state);

  // enter layout title
  await utils.inputTypeText(page, `${selectors.edit.layout.wrapper} div[id="title"] input`, 'Person');
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.layout.json.title = 'Person';

  // verify all
  await verifyAll(page, state);

  // enter layout layout
  await utils.selectFromDropdown(page, 'layout', 2);
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.layout.json.layout = 'tabs';

  // verify all
  await verifyAll(page, state);

  // enter layout size
  await utils.inputTypeText(page, `${selectors.edit.layout.wrapper} div[id="size"] input`, '2');
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.layout.json.size = 2;

  // verify all
  await verifyAll(page, state);

  // add section
  await addSection(page);

  // verify all (see that now we see the preview of layout)
  state.layout.json.sections = [{ id: 'info', title: 'Info', grid: {
    templateAreas: [
      'firstName . .',
      '. . .',
      '. . .'],
  } }];
  await verifyAll(page, state);

  // add main action
  await addMainAction(page);

  // verify all
  state.layout.json.mainActions = [{ label: 'Save', type: 'primary' }];
  await verifyAll(page, state);

  // add option action
  await addOptionsAction(page);

  // verify all
  state.layout.json.optionsActions = [{ label: 'Save' }];
  await verifyAll(page, state);

  // reload page
  await page.reload();
  await page.waitFor(1500);

  // edit layout - click show json
  await showJson(page, selectors.edit.layout);
 
  // disable check of the config after refresh cuz the json view is closed behind blocker (json view open is not persistent)
  state.config.disableCheck = true; 
  state.log.debug = 7; // init from draft

  // verify persistency
  await verifyAll(page, state);

  // save layout
  await page.click(selectors.edit.layout.save);
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.config.json.layouts = { [state.layout.json.id]: state.layout.json };
  delete state.layout.json.id;
  state.config.blocked = false;
  state.layout.display = false;
  state.layout.json = undefined;
  state.layout.saveDisabled = true;
  state.playground = { display: true, json: { firstName: 'Ross' }, fields: 2 };
  state.log.debug = 20; // destroy (6) + init (14)

  // verify all
  await verifyAll(page, state);

  state.config.disableCheck = false;
  // click show json
  await showJson(page, selectors.edit.config);
}

async function addSection(page) {
  // click on add button
  const add = await page.$('div[id="sections"] [aria-label="Component"] button');
  await add.click();
  await page.waitFor(utils.COFI_LIFECYCLE);

  // enter section id and title
  await utils.inputTypeText(page, `[role="presentation"] [aria-label="Sections"] [id="section"] [id="id"] input`, 'info');
  await utils.inputTypeText(page, `[role="presentation"] [aria-label="Sections"] [id="section"] [id="title"] input`, 'Info');

  // enter field first name
  await utils.selectFromDropdown(page, 'gridTemplateAreas', 1);

  // save section
  await page.waitFor(utils.COFI_LIFECYCLE);
  const save = await page.$('[role="presentation"] [role="dialog"] > div:last-child button:last-child');
  await save.click();
  await page.waitFor(utils.COFI_LIFECYCLE);
}

async function addMainAction(page) {
  await addAction(page, 'mainActions');
}

async function addOptionsAction(page) {
  await addAction(page, 'optionsActions');
}

async function addAction(page, id) {
  // click on add button
  const add = await page.$(`div[id="${id}"] [aria-label="Component"] button`);
  await add.click();
  await page.waitFor(utils.COFI_LIFECYCLE);

  // enter action label
  await utils.inputTypeText(page, `[role="presentation"] [aria-label="Sections"] [id="label"] input`, 'Save');

  // save action
  await page.waitFor(utils.COFI_LIFECYCLE);
  const save = await page.$('[role="presentation"] [role="dialog"] > div:last-child button:last-child');
  await save.click();
  await page.waitFor(utils.COFI_LIFECYCLE);
}
