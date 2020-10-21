/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';

const JsEditor = styled(AceEditor)`
  height: 150px !important;
  overflow: auto;
`;

export default ({ value, onValueChange, state = {} }) => (<JsEditor
  value={value}
  mode="javascript"
  theme="tomorrow"
  name="handler"
  onChange={onValueChange}
  fontSize={14}
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  setOptions={{
    readOnly: state.readOnly,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    enableSnippets: false,
    showLineNumbers: true,
    tabSize: 2,
  }} />);
