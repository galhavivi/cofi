/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import JSZip from 'jszip';
import addFormFolder from './addFormFolder';

const addSectionsFile = (sections, folder) => {
  const sectionsStr = 
  `import { Field } from '@cofi/react-form';
  
  const getGrid = (templateAreas) => {
    let fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
    fieldIds = [...(new Set(fieldIds))];
  
    return {
      templateAreas,
      elements: fieldIds.map(id => ({ 
        selector: '#' + id, 
        gridArea: id, 
        component: Field, 
        props: { id },
      })),
    };
  };
  
  export default [
    ${sections.map(section => `{
      id: '${section.id}',
      ${section.title ? `title: '${section.title}',` : ''}
      grid: getGrid([
        ${section.grid.templateAreas.map(x => `'${x}',`).join('\n        ')}
      ]),
    },`).join(' ')}
  ];
  `;

  folder.file('sections.js', sectionsStr);
};

const getObjectStr = (obj, x) => (obj[x] !== undefined ? `\n          ${x}: '${obj[x]}',` : '');

const getObjectFn = (obj, x) => (obj[x] ? `\n          ${x}: () => { /* TODO: ${obj[x]} */ },` : '');

const getActions = (actions) => `[${actions.map(action => {
  return '{' 
    + getObjectStr(action, 'label')
    + getObjectStr(action, 'type')
    + getObjectFn(action, 'exclude')
    + getObjectFn(action, 'disable')
    + getObjectFn(action, 'onClick')
    + '\n        }';
}).join(', ')}]`;

const getItem = (item) => '{' 
  + (item.title !== undefined ? `\n        title: '${item.title}',` : '')
  + (item.layout !== undefined ? `\n        layout: '${item.layout}',` : '')
  + (item.size !== undefined ? `\n        size: ${item.size},` : '')
  + '\n        sections,'
  + (item.mainActions ? `\n        mainActions: ${getActions(item.mainActions)},` : '')
  + (item.optionsActions ? `\n        optionsActions: ${getActions(item.optionsActions)},` : '')
  + '\n      },';

const addItemFile = (item, folder) => {
  const itemStr = `
import React from 'react';
import { FormContext, createForm } from '@cofi/react-form';
import Item from '@cofi/react-layout/Item';
import form from '../../form';
import sections from './sections';

class ItemLayout extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    this.state = {
      item: ${getItem(item)}
    };
  }

  render = () => (<Item {...this.state.item} />);
}

export default createForm(form)(ItemLayout);
`;

  folder.file('Item.jsx', itemStr);
};

const addLayoutsFolder = (rootFolder, layouts) => {
  if (!layouts) return;

  // add layouts folder
  const layoutsFolder = rootFolder.folder('layouts');

  // add each layout folder
  Object.keys(layouts).forEach(id => {
    // create layout folder
    const layoutFolder = layoutsFolder.folder(id);

    // add sections file
    addSectionsFile(layouts[id].sections, layoutFolder);

    // add item file
    addItemFile(layouts[id], layoutFolder);
  });
};

export default (form) => {
  const rootFolder = new JSZip();
  
  addFormFolder(rootFolder, form);
  addLayoutsFolder(rootFolder, form.layouts);

  rootFolder.generateAsync({ type:'blob' }).then((content) => {
    const href = window.URL.createObjectURL(content);
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('download', `${form.model.id}.zip`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
