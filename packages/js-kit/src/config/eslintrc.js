/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

'use strict';
const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: ['airbnb-base'], // extend airbnb-base configuration which contains set of rules and settings
  root: true, // stops ESLint from looking for a configuration file in parent folders
  plugins: ['no-for-of-loops', 'import', 'json'], // extra set of rules
  parser: '@babel/eslint-parser', // by default eslint expects ES5 syntax. babel parser helps to extend to more syntax
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    requireConfigFile: false,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  settings: { // shared settings to all the rules
    'import/resolver': {
      node: {
        extensions: [".js"]
      }
    }
  },
  overrides: [{
    files: ["**/*.spec.js"],
    env: {
      jest: true // now **/*.spec.js files env has both es6 *and* jest
    },
    plugins: ["jest"],
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    }
  }],
  globals: { // tells eslint how to treat global variable when it encounter one
    spyOnDev: true,
    spyOnDevAndProd: true,
    spyOnProd: true,
    __PROFILE__: true,
    __UMD__: true,
  },
  rules: { // declaring the rules we want to use from the plugins array
    'accessor-pairs': OFF,
    'brace-style': [ERROR, '1tbs', { allowSingleLine: true }],
    'comma-dangle': [ERROR, 'always-multiline'],
    'consistent-return': OFF,
    'dot-location': [ERROR, 'property'],
    'dot-notation': ERROR,
    'eol-last': ERROR,
    'eqeqeq': [ERROR, 'allow-null'],
    'indent': OFF,
    'import/prefer-default-export': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/no-webpack-loader-syntax': OFF,
    'import/order': [ERROR, { 'newlines-between': 'never' }],
    'keyword-spacing': [ERROR, { after: true, before: true }],
    'no-bitwise': OFF,
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-shadow': OFF,
    'no-unused-expressions': [ERROR, { allowTernary: true, allowShortCircuit: true }],
    'no-unused-vars': [ERROR, { args: 'none' }],
    'no-use-before-define': [ERROR, { functions: false, variables: false }],
    'no-useless-concat': OFF,
    'object-curly-newline': OFF,
    'quotes': [ERROR, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'space-before-blocks': ERROR,
    'valid-typeof': [ERROR, { requireStringLiterals: true }],
    'no-var': ERROR,
    'strict': ERROR,
    'no-for-of-loops/no-for-of-loops': ERROR,
    'max-len': [ERROR, { code: 130 }],
    'no-console': ERROR,
    'no-param-reassign': OFF,
  },
};