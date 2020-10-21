/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { FieldView } from '../lib';

describe('FieldView', () => {
  let props;
  let element;

  beforeEach(() => {
    props = {
      id: 'firstName',
      label: 'First Name',
      description: 'Enter your first name',
      value: 'Rachel Green',
      state: {},
      excluded: undefined,
      disabled: undefined,
      required: undefined,
      invalid: undefined,
      dirty: undefined,
      empty: undefined,
      errors: undefined,
      component: jest.fn(),
      onValueChange: jest.fn(),
      onStateChange: jest.fn(),
    };
  });

  describe('PropTypes', () => {
    it('component - valid when component is forwardRef object', () => {
      const component = React.forwardRef((props, ref) => React.createElement('div', { ref, ...props }));
      testComponentPropType(component);
    });

    it('component - valid when component is class component', () => {
      class myInput extends React.Component {
        render() { return (<div>{this.name}</div>); }
      }
      testComponentPropType(myInput);
    });

    it('component - valid when component is functional component', () => {
      const component = () => {};
      testComponentPropType(component);
    });

    function testComponentPropType(component, errorsNumber = 0) {
      const { error } = global.console;
      global.console.error = jest.fn();
      const fieldViewProps = Object.assign(props, { component });
      PropTypes.checkPropTypes(FieldView.propTypes, fieldViewProps, 'prop', 'fieldView');
      expect(global.console.error.mock.calls).toHaveLength(errorsNumber);
      global.console.error = error;
    }
  });

  describe('render', () => {
    it('default test props', () => {
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('id = undefined', () => {
      props.id = undefined;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('label = undefined', () => {
      props.label = undefined;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('description = undefined', () => {
      props.description = undefined;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('value = undefined', () => {
      props.value = undefined;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('state = undefined', () => {
      props.state = undefined;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });
  
    it('excluded = true', () => {
      props.excluded = true;
      element = shallow(<FieldView {...props} />);
      expect(element.type()).toEqual(null);
      expect(element).toMatchSnapshot();
    });
  
    it('disabled = true', () => {
      props.disabled = true;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('dirty = true', () => {
      props.dirty = true;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('required = true', () => {
      props.required = true;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('empty = true', () => {
      props.empty = true;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('invalid = true', () => {
      props.invalid = true;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('errors = [...]', () => {
      props.errors = [{ name: 'munLength', message: 'min length is 2' }];
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('component = undefined', () => {
      props.component = undefined;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('onValueChange = undefined', () => {
      props.onValueChange = undefined;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });

    it('onStateChange = undefined', () => {
      props.onStateChange = undefined;
      element = shallow(<FieldView {...props} />);
      expect(element).toMatchSnapshot();
    });
  
    it('un-supported cofi field props - pass it to the underline component', () => {
      element = shallow(<FieldView mickey="mouse" {...props} />);
      expect(element).toMatchSnapshot();
    });
  });
});
