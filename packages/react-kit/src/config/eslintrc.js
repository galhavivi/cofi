/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

'use strict';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['fbjs'], // extend facebook configuration which contains set of rules and settings
  root: true, // stops ESLint from looking for a configuration file in parent folders
  plugins: ['no-for-of-loops', 'import', 'json', 'react', 'react-hooks'], // extra set of rules
  parser: '@babel/eslint-parser', // by default eslint expects ES5 syntax. babel parser helps to extend to more syntax
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  settings: { // shared settings to all the rules
    react: {
      version: 'detect',
    }
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
    },
  ],
  globals: { // tells eslint how to treat global variable when it encounter one
    spyOnDev: 'writable',
    spyOnDevAndProd: 'writable',
    spyOnProd: 'writable',
    __PROFILE__: 'writable',
    __UMD__: 'writable',
    flushAllPromises: 'writable',
    mount: 'writable',
    render: 'writable',
    shallow: 'writable',
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
    'indent': [ERROR, 2],
    'import/order': [ERROR, { 'newlines-between': 'never' }],
    'jsx-quotes': [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, { after: true, before: true }],
    'no-bitwise': OFF,
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-shadow': OFF,
    'no-unused-expressions': [WARNING, { allowTernary: true, allowShortCircuit: true }],
    'no-unused-vars': [WARNING, { args: 'none' }],
    'no-use-before-define': [ERROR, { functions: false, variables: false }],
    'no-useless-concat': OFF,
    'object-curly-newline': ERROR,
    'quotes': [ERROR, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'space-before-blocks': ERROR,
    'space-before-function-paren': OFF,
    'valid-typeof': [ERROR, { requireStringLiterals: true }],
    'no-var': ERROR,
    'strict': ERROR,
    'react/jsx-boolean-value': [ERROR, 'always'],
    'react/jsx-no-undef': ERROR,
    'react/jsx-sort-prop-types': OFF,
    'react/jsx-tag-spacing': [ERROR, { beforeSelfClosing: 'always' }],
    'react/jsx-uses-react': ERROR,
    'react/no-is-mounted': OFF,
    'react/react-in-jsx-scope': ERROR,
    'react/self-closing-comp': ERROR,
    'react/jsx-wrap-multilines': [ERROR, { declaration: false, assignment: false }],
    "react-hooks/rules-of-hooks": ERROR,
    "react-hooks/exhaustive-deps": WARNING,
    'no-for-of-loops/no-for-of-loops': ERROR,
    'max-len': [WARNING, { code: 130 }],
    'no-console': WARNING,
    'import/no-webpack-loader-syntax': OFF,
    'object-curly-spacing': [ERROR, 'always'],
    'curly': [ERROR, 'multi-line', 'consistent'],
    'comma-spacing': [ERROR, { before: false, after: true }]
  },
};
