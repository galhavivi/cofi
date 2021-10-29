/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  getInput, isDataViewerContains, CORE_CYCLE_TIME,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for circular loop to stop
  await waitForAsyncToRender(page);

  // Fields do not appear because init form action failed 
  // and the action reverted to the prev form snapshot.
  
  // Field with id "first"
  let id = 'first';
  let leafPath = 'first';
  let initialValue = '';
  let input = await getInput(page, id, initialValue);
  expect(input).toBeFalsy();
  let exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();

  // Field with id "second"
  id = 'second';
  leafPath = 'second';
  initialValue = '';
  input = await getInput(page, id, initialValue);
  expect(input).toBeFalsy();
  exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();
}

async function waitForAsyncToRender(page) {
  await page.waitFor(CORE_CYCLE_TIME);
}
