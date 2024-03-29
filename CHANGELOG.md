# Cofi Changelog

## Unreleased

Changes that have landed in master but are not yet released.

## v3.0.3 (November 30, 2021)

### overall

* Fix versions dependencies. [Issue 32](https://github.com/galhavivi/cofi/issues/32)
## v3.0.2 (November 21, 2021)

### react-components

* Update @material-ui to @mui. [Issue 29](https://github.com/galhavivi/cofi/issues/29)

### documentation

* Update docusaurus version. [Issue 27](https://github.com/galhavivi/cofi/issues/27)

## v3.0.1 (November 10, 2021)

### environment

* Upgrade to Node 17. [Issue 18](https://github.com/galhavivi/cofi/issues/18)

### js-kit

* Update eslint version to 8. [Issue 20](https://github.com/galhavivi/cofi/issues/20)

* Update dependencies to latest versions. [Issue 22](https://github.com/galhavivi/cofi/issues/22)

### react-kit

* Refactor react-form demo's code to functional components. [Issue 14](https://github.com/galhavivi/cofi/issues/14)

* Update dependencies to latest versions. [Issue 22](https://github.com/galhavivi/cofi/issues/22)

### react-layout

* Refactor react-layout demo's code to functional components. [Issue 16](https://github.com/galhavivi/cofi/issues/16)

## v2.0.0 (October 24, 2021)

### js-kit

* Update jest version to ^27.3.1
### react-kit

* Change react major version from 16 to 17.

* Add dependency to new testing library - @testing-library/react

### react-form

* Update most react-form tests to use @testing-library/react

* Rerender FieldView on custom prop change. [Issue 8](https://github.com/galhavivi/cofi/issues/8)

* Revert form state on action error. [Issue 7](https://github.com/galhavivi/cofi/issues/7)

## v1.0.0 (November 2, 2020)

### Documentation

* Refactor documentation.

* Add technologies doc.

* Add tools docs.

### Form

* Add setLogger - support custom logger.

* Refactor actions structure and debug.

* Add current form object to the log records.

* Expose destroyed getter.

* Add field.component.ready internal flag.

* Return true on success init.

### React Form

* Refactor demos website.

* Add overall demo.

* Refactor demo "Consume Context".

* Add LogContext, LogProvider, withLog HOC

* Add Log component to demos website.

* Refactor Field to functional component.

* Refactor FieldView.

* Update Form component - destroy private form before any new model prop.

* Add withForm HOC.

* Refactor Form to functional component.

* Add elements attributes to FieldView.

### React Components

* Extract FormErrors to form folder.

* Add Log component.

### React Layout

* Refactor demos websites.

* Refactor Item component.

* Add sizes to Footer in ItemView

* Update Box component to generic box

### React Editor

* New editor version

* Add online resources edit

* Add preview

* Add log viewer

# Jafar Changelog

### Form

* Fix - form gets new actions after destroy. [Issue 82](https://github.com/yahoo/jafar/issues/82)

### React Editor

* Add - fields library. [Issue 75](https://github.com/yahoo/jafar/issues/75)

### React Components

* Update selects components - support custom styles. [Issue 79](https://github.com/yahoo/jafar/issues/79)

* Add toJafar hoc util and transfer components to use it. [Issue 86](https://github.com/yahoo/jafar/issues/86)

### Documentation

* Add toJafar hoc util and how to test components. [Issue 86](https://github.com/yahoo/jafar/issues/86)

## v1.0.9 (July 15, 2020)

### React Form

* Add - parent context for form's context. [Issue 73](https://github.com/yahoo/jafar/issues/73)

### React Layout

* Add - props of 'templateColumns' and 'gap' to section grid. [Issue 73](https://github.com/yahoo/jafar/issues/73)

### React Editor

* Add - layout editor for each form. [Issue 73](https://github.com/yahoo/jafar/issues/73)

* Update - download form files - to include form's layouts. [Issue 73](https://github.com/yahoo/jafar/issues/73)

### Documentation

* Fix - path doc. [Issue 69](https://github.com/yahoo/jafar/issues/69)

## v1.0.8 (July 10, 2020)

### React Layout

* Add - size support. [Issue 67](https://github.com/yahoo/jafar/issues/67)

## v1.0.7 (July 8, 2020)

### React Layout

* Add - wizard demo. [Issue 46](https://github.com/yahoo/jafar/issues/46)

* Add - sections by grid css config. [Issue 62](https://github.com/yahoo/jafar/issues/62)

### Documentation

* Fix - demos broken links. [Issue 59](https://github.com/yahoo/jafar/issues/59)

## v1.0.6 (July 5, 2020)

### Form

* Add - support for updater function for changeState and changeValue actions

### React Editor

* Fix - edit field should render all its validators when editing saved field

## v1.0.5 (July 4, 2020)

### General

* Add license field to all packages 

### Form

* Fix - when term supplied without indicator (e.g excludeTerm and excluded), indicator first true until calculated

* Fix - remove evaluate state changes from init field - its already evaluated in 'evaluateField'

### React Layout

* Footer popover - placement in parent container instead of body

### React Editor

* Add package `react-editor` - demo website to create form configuration using a simple UI

### Documentation

* Add online form editor of `react-editor` package to the docs

## v1.0.4 (February 24, 2020)

### React Kit

* Upgrade `react-scripts` to 3.4.0

## v1.0.3 (February 23, 2020)

### General

* Upgrade Jafar dependencies to 1.0.3

## v1.0.2 (February 22, 2020)

### General

* Rename packages scope from `jafar-org` to `jafar`

### React Kit

* Fix vulnerability: "serialize-javascript": "^2.1.1"

### React Form

* Demos website - fix scroll to selected left menu item

### React Layout

* Demos website - fix scroll to selected left menu item

### React Components

* Add component - view/JsonView

## v1.0.1 (February 4, 2020)

### Form 

* Improve dependenciesChange and add test case
* Fix - when field excluded, keep required value

### React Components

* Add component edit/JsonEditor
* Add default params to multi-select and one more

### React Form

* Website demos - add download demo button

### React Layout

* Website demos - add download demo button
* Fix popover demos markup

## v1.0.0 (January 1, 2020)

### From

* Add package `@jafar/form` 

### React From

* Add package `@jafar/react-form` 

### React Components

* Add package `@jafar/react-components` 

### React Layout

* Add package `@jafar/react-layout` 
