/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PrismCode from 'react-prism';
import 'prismjs';
import 'prismjs/themes/prism.css';
import readDemoFiles from '../utils/read-demo-files';
import Styled from './StyledComponents';

const Code = ({ children }) => (<Styled.Code>
  <PrismCode className="language-javascript" component="pre">{children}</PrismCode>
</Styled.Code>);

export default class DemoMarkup extends React.Component {
  constructor(props) {
    super(props);
    this.demo = readDemoFiles(props.exampleName, props);
  }

  render() {
    const { form, item } = this.demo;

    return (<Styled.DemoWrapper>
      {
        !this.props.hideHtml && <div>
          <Styled.H3>Components</Styled.H3>
          <p>Demo.jsx</p>
          <Code>{item.demo}</Code>
        </div>
      }
      <Styled.H3>Item definition</Styled.H3>
      <p>sections.js</p>
      <Code>{item.sections}</Code>
      {
        item.sectionsMobile && <div>
          <p>sections-mobile.js</p>
          <Code>{item.sectionsMobile}</Code>
        </div>
      }
      <Styled.H3>Form definition</Styled.H3>
      <p>{form.formFolder}/fields.js</p>
      <Code>{form.fields}</Code>
      {
        form.data && <div>
          <p>{form.formFolder}/data.js</p>
          <Code>{form.data}</Code>
        </div>
      }
      <p>{form.formFolder}/components.js</p>
      <Code>{form.components}</Code>
      {
        form.stateChanges && <div>
          <p>{form.formFolder}/state-changes.js</p>
          <Code>{form.stateChanges}</Code>
        </div>
      }
      {
        form.formatters && <div>
          <p>{form.formFolder}/formatters.js</p>
          <Code>{form.formatters}</Code>
        </div>
      }
      {
        form.parsers && <div>
          <p>{form.formFolder}/parsers.js</p>
          <Code>{form.parsers}</Code>
        </div>
      }
      {
        form.validators && <div>
          <p>{form.formFolder}/validators.js</p>
          <Code>{form.validators}</Code>
        </div>
      }
      {
        form.excludeTerm && <div>
          <p>{form.formFolder}/exclude-term.js</p>
          <Code>{form.excludeTerm}</Code>
        </div>
      }
      {
        form.disableTerm && <div>
          <p>{form.formFolder}/disable-term.js</p>
          <Code>{form.disableTerm}</Code>
        </div>
      }
      {
        form.dependenciesChanges && <div>
          <p>{form.formFolder}/dependencies-changes.js</p>
          <Code>{form.dependenciesChanges}</Code>
        </div>
      }
      {
        form.hooks && <div>
          <p>{form.formFolder}/hooks.js</p>
          <Code>{form.hooks}</Code>
        </div>
      }
      <p>{form.formFolder}/index.js</p>
      <Code>{form.index}</Code>
      {
        form.mockService && <div>
          <p>{form.formFolder}/mocks/service.js</p>
          <Code>{form.mockService}</Code>
        </div>
      }
    </Styled.DemoWrapper>);
  }
}
