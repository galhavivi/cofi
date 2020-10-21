/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  getField, getInput, getFieldText, testInput, testCheckboxCollection, testResetForm, verifyError,
  clearInputValue, typeInput, isDataViewerContains, CORE_CYCLE_TIME, verifyCheckBoxCollectionValuesMatch,
  getInputSelector, verifyCheckboxesComponentRendered, verifyDataViewerData,
} from '../../../e2e.utils';

export default async function (page) {
  // see that we have 7 debug logs of the init
  const logRecords = await page.$$('div[aria-label="Log"] > div');
  expect(logRecords.length).toBeTruthy();

  // Field with id "id" - readonly with custom field view
  let text = await getFieldText(page, 'id');
  expect(text).toEqual('🌴 Id:\n123456');

  // Field with id "name" - changes value - causes data viewer data to change
  let id = 'name';
  let leafPath = 'name';
  let initialValue = 'Rachel Green';
  await testInput(page, id, leafPath, initialValue, '2');

  // Field with id "hobbies" - changes value - causes data viewer data to change
  id = 'hobbies';
  initialValue = ['FASHION', 'SHOP'];
  let values = ['BASKETBALL', 'FOOTBALL', 'SHOP', 'FASHION', 'COOK'];
  const addValue = 'COOK';
  await testCheckboxCollection(page, id, initialValue, values, addValue);

  // Name = empty - shows required message
  await setName(page, '');
  await verifyError(page, 'name', 'Field required');

  // Name = 'R' - shows minLength validation error
  await setName(page, 'R');
  await verifyError(page, 'name', 'Minimum length is 2');

  // Name = 'Ross' - shows minLength validation error
  await setName(page, 'Ross');
  await verifyError(page, 'name', 'Name already exists');

  // Name = 'Joey' and click Save - shows submit validation error
  await setName(page, 'Joey');
  await page.click('button[aria-label="Save"]');
  await page.waitFor(CORE_CYCLE_TIME);
  await verifyError(page, 'name', 'Doesn\'t share food!');

  // Name = 'Carol' - excludes Hobbies
  await setName(page, 'Carol');
  let field = await getField(page, 'hobbies');
  expect(field).toBeFalsy();

  // Name = 'Suzan' - disables Hobbies
  await setName(page, 'Suzan');
  let input = await getInput(page, 'hobbies');
  const disabled = await page.evaluate(input => input.disabled, input);
  expect(disabled).toBeTruthy();

  // Name = 'Ben' - requires Hobbies
  await setName(page, 'Ben');
  text = await getFieldText(page, 'hobbies');
  expect(text).toContain('HOBBIES*');

  // Name = 'Emily' - parses view value to data value 'Rachel' (formatters and parsers)
  await clearInputValue(page, 'name');
  await typeInput(page, 'name', 'Emily');
  await page.waitFor(CORE_CYCLE_TIME);
  input = await getInput(page, 'name', 'Emily');
  expect(input).toBeTruthy();
  const dataValue = await isDataViewerContains(page, 'name', 'Rachel');
  expect(dataValue).toBeTruthy();
  
  // Name = 'Monica' - clears Hobbies search filter and sets only 'Cook'
  await setName(page, 'Monica');
  id = 'hobbies';
  initialValue = ['COOK'];
  values = ['BASKETBALL', 'FOOTBALL', 'SHOP', 'FASHION', 'COOK'];
  await verifyCheckBoxCollectionValuesMatch(page, id, initialValue, values);
  input = await page.$(`${getInputSelector('hobbies', '')}[type="search"]`);
  expect(input).toBeTruthy();

  // Admin View = true - includes Id field (user info is not part of the form)
  await page.click('button[aria-label="Role"]');
  await page.waitFor(CORE_CYCLE_TIME);
  field = await getField(page, 'id');
  expect(field).toBeFalsy();
  await page.click('button[aria-label="Role"]');
  await page.waitFor(CORE_CYCLE_TIME);
  field = await getField(page, 'id');
  expect(field).toBeTruthy();

  // Hobbies Search = 'ball' - changes state and filters items
  await page.waitFor(CORE_CYCLE_TIME);
  input = await page.$('input[type="search"]');
  await input.focus();
  page.keyboard.type('ball');
  await page.waitFor(CORE_CYCLE_TIME);
  id = 'hobbies';
  initialValue = ['COOK'];
  values = ['BASKETBALL', 'FOOTBALL'];
  await verifyCheckBoxCollectionValuesMatch(page, id, initialValue, values);

  // Page Refresh - preserves last Form state
  let pageData = {
    id: '123456',
    name: 'Monica',
    hobbiesChecked: ['COOK'],
    hobbiesFiltered: ['BASKETBALL', 'FOOTBALL'],
    hobbiesSearchValue: 'ball',
    data: {
      id: '123456',
      name: 'Monica',
      0: 'COOK',
    },
  };
  await verifyPageData(page, pageData);
  await page.reload();
  const htmlTabContainer = await page.$('#example-html');
  expect(htmlTabContainer).toBeTruthy();
  await page.waitFor(CORE_CYCLE_TIME);
  await verifyPageData(page, pageData);

  // Save - clears the form
  await page.click('button[aria-label="Save"]');
  await page.waitFor(CORE_CYCLE_TIME);
  pageData = {
    id: '',
    name: '',
    hobbiesChecked: [],
    hobbiesFiltered: ['BASKETBALL', 'FOOTBALL'],
    hobbiesSearchValue: 'ball', // search doesn't change on change data
    data: {
    },
  };
  await verifyPageData(page, pageData);

  // Reset - loads initial data
  const dataViewerData = {
    id: '123456',
    name: 'Rachel Green',
    0: 'FASHION',
    1: 'SHOP',
  };
  await testResetForm(page, dataViewerData, 4);
}

async function setName(page, value) {
  const id = 'name';
  const leafPath = 'name';
  const initialValue = '';
  await testInput(page, id, leafPath, initialValue, value, false, true);
}

async function verifyPageData(page, pageData) {
  // verify field 'id'
  let text = await getFieldText(page, 'id');
  expect(text).toEqual(`🌴 Id:${pageData.id ? '\n' + pageData.id : ''}`);

  // verify field 'name'
  const input = await getInput(page, 'name', pageData.name);
  expect(input).toBeTruthy();

  // verify field 'hobbies'
  await verifyCheckboxesComponentRendered(page, 'hobbies', pageData.hobbiesChecked, pageData.hobbiesFiltered);

  // verify field 'hobbies' search value
  const inputSearch = await getInput(page, 'hobbies', pageData.hobbiesSearchValue);
  expect(inputSearch).toBeTruthy();

  // verify data viewer
  await verifyDataViewerData(page, pageData.data, Object.keys(pageData.data).length);
}
