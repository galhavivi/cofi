const path = require('path');
const configFactory = require('react-scripts/config/webpack.config');

module.exports = {
  template: {
    favicon: 'src/favicon.ico',
  },
  skipComponentsWithoutExample: true,
  title: 'Cofi | React Components',
  require: [
    path.resolve(__dirname, 'styleguide.setup.js'),
    path.join(__dirname, 'styleguide.overrides.css'),
  ],
  theme: {
    sidebarWidth: 250,
    color: {
      base: '#555555',
      border: '#eaeaea',
      link: '#3fcee6',
      linkHover: '#3fcee6',
    },
  },
  sections: [{
    name: 'Field Edit Components',
    components: 'src/lib/edit/**/[A-Z]*.jsx',
    ignore: '**/internal/**/*',
  }, {
    name: 'Field View Components',
    components: 'src/lib/view/**/[A-Z]*.jsx',
    ignore: '**/internal/**/*',
  }, {
    name: 'Form Components',
    components: 'src/lib/form/**/[A-Z]*.jsx',
    ignore: '**/internal/**/*',
  }],
  webpackConfig: configFactory('development'),
};
