/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import isString from 'lodash/isString';
import merge from 'lodash/merge';


function convertStringToFunction(value = '') {
  // convert string to one line
  const valueOneLine = value.replace(/\n/g, ' COFI_NEW_LINE ');

  // extract function's args
  const args = valueOneLine
    .replace(/\/\/.*$|\/\*[\s\S]*?\*\//mg, '') // strip comments
    .match(/\(.*?\)/m)[0] // find argument list
    .replace(/^\(|\)$/, '') // remove parens
    .match(/[^\s(),]+/g) || []; // find arguments

  // extract body between curlies
  const body = valueOneLine.match(/\{(.*)\}/)[1]; 

  // return string to multi line
  const bodyMultiLine = body.replace(/ COFI_NEW_LINE /g, '\n');

  return Function.apply(0, args.concat(bodyMultiLine));
}

const resourceStringToFunction = (resource) => {
  Object.values(resource).forEach(x => {
    if (isString(x.func)) x.func = convertStringToFunction(x.func);
    if (isString(x.message)) x.message = convertStringToFunction(x.message);
    if (isString(x.stateChange)) x.stateChange = convertStringToFunction(x.stateChange);
    if (isString(x.renderer)) x.renderer = convertStringToFunction(x.renderer);
  });
};

const resourcesToFunctions = (resources = {}) => {
  // convert all form resources function strings to actual functions
  Object.values(resources).forEach(resource => resourceStringToFunction(resource));
  return resources;
};

export const mergeResourcesAndConvertFunctions = (appResources = {}, formResources = {}) => {
  const resources = merge({}, appResources, formResources);
  return resourcesToFunctions(resources);
};
