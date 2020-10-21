/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import puppeteer from 'puppeteer';
import { testCreateNewForm } from './pages/Form/e2e/form.ete';

const MAX_TEST_MILLISECONDS = 120000;
const viewport = { width: 1440, height: 900 };
const localhostUrl = 'http://localhost:3000/';
const BASE_URL = process.env.DEMO_URL || localhostUrl;
const browsers = [];

const selectors = {
  root: '#cofi-react-editor-demos',
};

describe('Demos e2e', () => {
  it('Cofi react editor sanity', async () => {
    // wait for the array of parallel tests
    await Promise.all([
      execTest(testCreateNewForm),
    ]);
  }, MAX_TEST_MILLISECONDS);

  afterAll(() => {
    browsers.forEach((browser) => {
      browser.close();
    });
  });
});

async function execTest(testFunc) {
  const browser = await puppeteer.launch({
    headless: true, // !!process.env.CI,
  });

  browsers.push(browser);
  const page = await openTabPageOnBrowser(browser);

  // set animation faster
  await page._client.send('Animation.setPlaybackRate', { playbackRate: 1000 });

  let error;

  try {
    await testFunc(page);
  } catch (ex) {
    error = ex;
  }

  const path = `e2e-logs/${testFunc.name}.png`;
  await page.screenshot({ path });

  if (error) {
    console.log(`Error in test: "${testFunc.name}".`); // eslint-disable-line
    throw error;
  }
}

async function openTabPageOnBrowser(browser) {
  const page = await browser.newPage();
  page.emulate({ viewport, userAgent: '' });
  await page.goto(BASE_URL);
  await page.waitForSelector(selectors.root);
  return page;
}
