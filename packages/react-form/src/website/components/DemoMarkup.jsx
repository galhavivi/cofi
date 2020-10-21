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
    this.form = readDemoFiles(props.exampleName, props);
  }

  render() {
    return (<Styled.DemoWrapper>
      <Styled.H3>Form definition</Styled.H3>
      <p>{this.form.formFolder}/fields.js</p>
      <Code>{this.form.fields}</Code>
      {
        this.form.data && <div>
          <p>{this.form.formFolder}/data.js</p>
          <Code>{this.form.data}</Code>
        </div>
      }
      <p>{this.form.formFolder}/components.js</p>
      <Code>{this.form.components}</Code>
      {
        this.props.conversions && <div>
          <p>{this.form.formFolder}/conversions.js</p>
          <Code>{this.form.conversions}</Code>
        </div>
      }
      {
        this.props.validators && <div>
          <p>{this.form.formFolder}/validators.js</p>
          <Code>{this.form.validators}</Code>
        </div>
      }
      {
        this.props.terms && <div>
          <p>{this.form.formFolder}/terms.js</p>
          <Code>{this.form.terms}</Code>
        </div>
      }
      {
        this.props.dependenciesChanges && <div>
          <p>{this.form.formFolder}/dependencies-changes.js</p>
          <Code>{this.form.dependenciesChanges}</Code>
        </div>
      }
      {
        this.props.hooks && <div>
          <p>{this.form.formFolder}/hooks.js</p>
          <Code>{this.form.hooks}</Code>
        </div>
      }
      {
        this.props.context && <div>
          <p>{this.form.formFolder}/context.js</p>
          <Code>{this.form.context}</Code>
        </div>
      }
      <p>{this.form.formFolder}/index.js</p>
      <Code>{this.form.index}</Code>
      {
        this.props.mockService && <div>
          <p>{this.form.formFolder}/mocks/service.js</p>
          <Code>{this.form.mockService}</Code>
        </div>
      }
      {
        !this.props.hideHtml
        && <div>
          <Styled.H3>Components</Styled.H3>
          <p>Demo.jsx</p>
          <Code>{this.props.demo}</Code>
          {
            this.form.extraComponents && <div>{
              this.form.extraComponents.map((component, index) => (<div key={index}>
                <p>{component.filePath}.jsx</p>
                <Code>{component.content}</Code>
              </div>))
            }</div>
          }
        </div>
      }
    </Styled.DemoWrapper>);
  }
}
