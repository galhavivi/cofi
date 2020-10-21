/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
const removePrivateData = (obj = {}) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (key.startsWith('_')) {
      delete newObj[key];
    }
  });
  return newObj;
};

const addResource = (form, formFolder, formIndex, formIndexResourcesImports, resourceName) => {
  if (!form.resources[resourceName]) return formIndex;
  
  const str = 
`export default {
  ${Object.keys(form.resources[resourceName]).map(name => {
    const { defaultArgs, func, message, renderer, stateChange } = form.resources[resourceName][name];
    const arr = [];
    defaultArgs && arr.push(`defaultArgs: ${JSON.stringify(defaultArgs)}`);
    func && arr.push(`func: ${func}`);
    message && arr.push(`message: ${message}`);
    renderer && arr.push(`renderer: ${renderer}`);
    stateChange && arr.push(`stateChange: ${stateChange}`);

    return `${name}: {
    ${arr.join(',\n    ')}
  }`;
  }).join(',\n')}
}`;

  formFolder.file(`${resourceName}.js`, str);
  formIndexResourcesImports.push(resourceName);
  formIndex += `import ${resourceName} from './${resourceName}.js';\n`;
  return formIndex;
};

const addJson = (container, formFolder, formIndex, name, formIndexModelImports = []) => {
  if (container[name]) {
    formFolder.file(`${name}.json`, JSON.stringify(container[name]));
    formIndex += `import ${name} from './${name}.json';\n`;
    formIndexModelImports.push(name);
  }
  return formIndex;
};

export default (rootFolder, form) => {
  // add form folder
  const formFolder = rootFolder.folder('form');

  let formIndex = `import fields from './fields';\n`;
  const formIndexModelImports = ['fields'];
  const formIndexResourcesImports = [];

  // add fields folder
  const fieldsFolder = formFolder.folder('fields');
  let fieldsIndex = '';
  const fieldIds = Object.keys(form.model.fields);
  fieldIds.forEach(fieldId => {
    const field = removePrivateData(form.model.fields[fieldId]);
    fieldsFolder.file(`${fieldId}.json`, JSON.stringify(field));
    fieldsIndex += `import ${fieldId} from './${fieldId}.json';\n`;
  });
  fieldsIndex += `\n\nexport default { ${ fieldIds.join(', ') } }`;
  fieldsFolder.file('index.js', fieldsIndex);

  // add data file
  formIndex = addJson(form.model, formFolder, formIndex, 'data', formIndexModelImports);

  // add context file
  formIndex = addJson(form.model, formFolder, formIndex, 'context', formIndexModelImports);

  // add resources
  if (form.resources) {
    // add components
    formIndex = addResource(form, formFolder, formIndex, formIndexResourcesImports, 'components');

    // add validators
    formIndex = addResource(form, formFolder, formIndex, formIndexResourcesImports, 'validators');

    // add terms
    formIndex = addResource(form, formFolder, formIndex, formIndexResourcesImports, 'terms');

    // add conversions
    formIndex = addResource(form, formFolder, formIndex, formIndexResourcesImports, 'conversions');

    // add dependenciesChanges
    formIndex = addResource(form, formFolder, formIndex, formIndexResourcesImports, 'dependenciesChanges');
  }

  // add settings file
  formIndex = addJson(form, formFolder, formIndex, 'settings');

  // add index file
  formIndex += `
export default { 
  model: { id: '${form.model.id}', ${formIndexModelImports.join(', ')} },
  ${ form.resources ? `resources: { ${ Object.keys(form.resources).join(', ') } },` : '' }
  ${ form.settings ? 'settings,' : '' }
}`;

  formFolder.file('index.js', formIndex);
};
