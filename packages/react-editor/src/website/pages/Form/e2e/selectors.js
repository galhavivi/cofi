/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const wrappers = {
  FORM_EDITOR: '[aria-label="Form Editor"]',
  CONFIG: '[aria-label="Edit Config"]',
  FIELD: '[aria-label="Edit Item"][type="field"]',
  LAYOUT: '[aria-label="Edit Item"][type="layout"]',
  PREVIEW: '[aria-label="Preview"]',
  LOG: 'div[aria-label="Log"]',
};

const base = wrapper => ({
  wrapper,
  options: {
    menu: `${wrapper} [aria-label="Options"]`,
    showJson: '[id="options-menu"] [role="menuitem"]:nth-child(1)',   
  },
  jsonView: `${wrapper} [aria-label="json-view"]`,
  save: `${wrapper} [aria-label="Footer"] button[button-type="primary"]`,
  cancel: `${wrapper} [aria-label="Footer"] button[button-type="tertiary"]`,
});

export default {
  logo: '#logo',
  root: '#cofi-react-editor-demos',
  home: {
    wrapper: '[aria-label="home-page"]',
    actions: {
      initDB: '[aria-label="init-db"]',
      forms: '[aria-label="forms"]',
    },
  },
  list: {
    wrapper: '#form-list',
    rows: '#form-list [aria-label="grid"] [aria-label="grid-row"]',
    create: '#form-list [aria-label="grid"] [aria-label="grid-header-menu"] button:nth-child(1)',
    rowActionsButton: 'button[aria-label="actions"]',
    rowActionsMenu: '[role="presentation"]:not([aria-hidden="true"])',
  },
  edit: {
    wrapper: wrappers.FORM_EDITOR,
    config: {
      ...base(wrappers.CONFIG),
      blocker: `${wrappers.CONFIG} [aria-label="Blocker"]`,
      addField: `${wrappers.CONFIG} [id="fields"] [aria-label="grid-header-menu"] button:last-child`,
      fieldsRows: `${wrappers.CONFIG} [id="fields"] [aria-label="grid-row"]`,
      addLayout: `${wrappers.CONFIG} [id="layouts"] [aria-label="grid-header-menu"] button:last-child`,
      layoutsRows: `${wrappers.CONFIG} [id="layouts"] [aria-label="grid-row"]`,
    },
    field: {
      ...base(wrappers.FIELD),
      addValidator: `${wrappers.FIELD} div[id="validators"] [aria-label="add-validator"]`,
    },
    layout: {
      ...base(wrappers.LAYOUT),
    },
    preview: {
      ...base(wrappers.PREVIEW),
      tabs: `${wrappers.PREVIEW} [aria-label="Tabs"]`,
      playground: `${wrappers.PREVIEW} #playground`,
      playgroundFields: `${wrappers.PREVIEW} [aria-label="Sections"] #playground div[id]`,
      log: {
        wrapper: wrappers.LOG,
        tabs: `${wrappers.LOG} > div:first-child > div:last-child`,
        clear: `${wrappers.LOG} > div:first-child > div:last-child > button[type="button"]`,
      },
    },
  },
};
