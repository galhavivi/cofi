/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import Form from './Form';
import { createForm } from './definition';
import { verifyForm } from './verification';
import { setLogger, setLogLevel, logLevels } from './log';
import { Actions, Steps, UiSteps } from './actions/types';
import { mapFieldToProps } from './utils.ui';

export {
  createForm,
  verifyForm,
  setLogger,
  setLogLevel,
  logLevels,
  Actions,
  Steps,
  UiSteps,
  mapFieldToProps,
};

export default Form;
