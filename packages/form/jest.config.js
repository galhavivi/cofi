const { defaultsDeep } = require('lodash');
const base = require('@cofi/js-kit/config/jest.config.js');

module.exports = defaultsDeep({
  coverageThreshold: {
    global: {
      lines: 99.9,
      branches: 95.33,
      functions: 99.76,
      statements: 99.82,
    },
  },
}, base);
