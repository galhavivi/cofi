---
id: log
title: Log
sidebar_label: Log
---

Cofi logs error, warning and debug messages according to a log level. The log level is shared across forms, i.e changing it will affect 
all defined forms.

## Log Levels

| Name          | Description |
| ------------- |-------------|
| None | Cofi logs no messages |
| Error | Cofi logs errors messages |
| Warning | Cofi logs errors and warnings messages |
| Debug | Cofi logs errors, warnings and debug messages |

`Debug` messages logs all the changes that are applied to the form per each action (such as init, changeFieldValue and more). Each debug message contains an action step which changes the internal private form model, and the new form model object. Some action's steps affect the ui, and will update the ui to use the new form model object (by passing the UI - such as the react Form component the new form model object to share in its context to its child components like the react Field component)

> **Note:** `Debug` messages appear on `verbose` / `debug` tab of the browser's console - and not under `info` tab. Also
by default they appear only when NODE_ENV === 'development' (e.g - on localhost debug), and therefor do not appear in the online Cofi demos.

#### Example 

Change field value causing the bellow debug messages. Change field value caused 3 ui renders (marked as `+ UI update`):

1. Setting `model.fields.fieldId.component.value` - to the new value. That's the placement which keeps the "view value" and should immediately change for a fast ui reaction to the user.
1. When the form starts to process the new incoming action of change field value. We notify the ui change here since you will probably want to disable a save button while the form is processing (calculating validations and more).
1. When the form end to process the actions queue. We notify the ui change here since you will probably want to enable the save button after the above disable.

![Manage Page](assets/log-debug-v1.0.0.png)

In the above image we can see the following debug messages:

1. Set model.fields.fieldId.component.value - to the new value (view value)
1. Add the action to the model.pendingActions queue
1. Start process the model.pendingActions queue
1. Start handle the action of - change field value
1. Set the new field value to the model.data object
1. Set field evaluation results (errors, disabled and more) - after calculating validations, exclude term and more.
1. Set form evaluation results (invalid and more)
1. End handle the action of - change field value
1. Remove the action from the queue
1. End process the model.pendingActions queue (queue is empty)

## Default Log Level

If process.env.NODE_ENV is 'development' then the default is logLevels.DEBUG, otherwise its logLevels.ERROR

## Change Log Level

Change log level using the following exposed `setLogLevel` function and `logLevels` enum:

```javascript
import { setLogLevel, logLevels } from '@cofi/form';

setLogLevel(logLevels.DEBUG);
```

## Custom Logger

Log can use multiple loggers. 
By default, log has only one logger named `default` which logs to the `console`.
In some cases, one might wish to write log messages to an external service.

Add / remove a logger using the following exposed `setLogger` function:

```javascript
import { setLogger } from '@cofi/form';

const customLogger = {
  debug: (props) => { /* ... */ }, // props = { action, step, form }
  warn: (props) => { /* ... */ }, // props = { message, form }
  error: (error) => { /* ... */ }, // error = CofiError object = { code, message, form, data, reference, subError }
};

// add a custom logger
setLogger('custom', customLogger); // now log will use 2 loggers - 'default' and 'custom'

// remove a custom logger
setLogger('custom'); // now log will use 1 logger - 'default'
```

In addition, passing part of the logger functions - will be merged with the named logger functions.

```javascript
import { setLogger } from '@cofi/form';

const customLogger = {
  debug: (props) => { /* ... */ }, // props = { action, step, form }
};

// set custom logger
setLogger('default', customLogger); 

// now log will use 1 logger - 'default' which logs errors and warning to the console, 
// and debug messages to the customLogger.debug
```