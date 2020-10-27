/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import * as utils from '../../../e2e.utils';
import selectors from './selectors';
import { verifyAll, showJson } from './common';

export default async function testEditLayout(page, state) {
  // edit layout
  await editLayout(page, state, true);

  // cancel
  await page.click(selectors.edit.layout.cancel);
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.config.blocked = false;
  state.layout.display = false;
  state.layout.json = undefined;
  state.layout.saveDisabled = true;
  state.playground = { display: true, json: { firstName: 'Ross' }, fields: 2 };
  state.log.debug = 20; // destroy (6) + init (14)

  // verify all
  await verifyAll(page, state);

  // edit layout
  await editLayout(page, state);

  // save
  await page.click(selectors.edit.layout.save);
  await page.waitFor(utils.COFI_LIFECYCLE);
  state.config.json.layouts[state.layout.json.id] = state.layout.json;
  delete state.layout.json.id;
  state.config.blocked = false;
  state.layout.display = false;
  state.layout.json = undefined;
  state.layout.saveDisabled = true;
  state.playground = { display: true, json: { firstName: 'Ross' }, fields: 2 };
  state.log.debug = 20; // destroy (6) + init (14)

  // verify all
  await verifyAll(page, state);
}

async function editLayout(page, state, openWithRowAction) {
  // click edit first layout
  const layoutLink = await page.$(`${selectors.edit.config.layoutsRows}:first-child > div:first-child a`);
  await layoutLink.click();
  await page.waitFor(utils.COFI_LIFECYCLE);

  if (openWithRowAction) {
    const actionsButton = await page.$(`${selectors.edit.config.layoutsRows}:first-child ${selectors.list.rowActionsButton}`);
    await actionsButton.click();
    await page.waitFor(utils.ANIMATION_DURATION);
    await page.click(`${selectors.list.rowActionsMenu}:last-child li:nth-child(1)`);
    await page.waitFor(utils.COFI_LIFECYCLE);
  }

  // click show json
  await showJson(page, selectors.edit.layout);

  // verify all
  state.config.blocked = true;
  state.layout.display = true;
  state.layout.json = { id: 'desktop', ...state.config.json.layouts.desktop };
  state.playground = { display: false, json: undefined, fields: 0 };
  await verifyAll(page, state);

  // change title
  await utils.textFieldTypeText(page, 'title', '2');
  await page.waitFor(utils.COFI_LIFECYCLE);

  // verify all
  state.layout.json.title = 'Person2';
  state.layout.saveDisabled = false;
  await verifyAll(page, state);
}
 
