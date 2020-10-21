/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import log from '../src/log';
import { setLogLevel, logLevels, setLogger } from '../src/index';
import { defaultLogger } from '../src/log';
import { createError, errors } from '../src/errors';

describe('Logger', () => {

  describe('setLogger', () => {

    afterEach(() => {
      // restore default logger
      setLogger('default', defaultLogger);
    });

    it('setLogger - add new logger', () => {
      // mock console functions
      const orgDebug = global.console.debug;
      const orgWarn = global.console.warn;
      const orgError = global.console.error;

      global.console.debug = jest.fn();
      global.console.warn = jest.fn();
      global.console.error = jest.fn();

      // set custom logger
      const customLogger = {
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
      };
      setLogLevel(logLevels.DEBUG);
      setLogger('custom', customLogger);
     
      // call current logger
      const action = { type: 'INIT', data: { a: 1 } };
      const step = { type: 'START_PROCESSING', uiChange: false };
      const form = { model: { id: 'friends' }, resources: {} };
      const message = 'warning!';
      const error = { a: 2 };

      log.debug({ action, step, form });
      log.warn({ message, form });
      log.error(error);

      // verify both - default logger and custom logger logs the messages
      expect(customLogger.debug.mock.calls).toHaveLength(1);
      expect(customLogger.warn.mock.calls).toHaveLength(1);
      expect(customLogger.error.mock.calls).toHaveLength(1);

      expect(global.console.debug.mock.calls).toHaveLength(1);
      expect(global.console.warn.mock.calls).toHaveLength(1);
      expect(global.console.error.mock.calls).toHaveLength(1);

      expect(customLogger.debug).toHaveBeenCalledWith({ action, step, form });
      expect(customLogger.warn).toHaveBeenCalledWith({ message, form });
      expect(customLogger.error).toHaveBeenCalledWith(error);

      expect(global.console.debug).toHaveBeenCalled();
      expect(global.console.warn).toHaveBeenCalled();
      expect(global.console.error).toHaveBeenCalled();

      // unset custom logger
      setLogger('custom');

      // call current logger
      log.debug({ action, step, form });
      log.warn({ message, form });
      log.error(error);

      // verify it calls to only to default logger
      // 1 call - from the first call
      expect(customLogger.debug.mock.calls).toHaveLength(1);
      expect(customLogger.warn.mock.calls).toHaveLength(1);
      expect(customLogger.error.mock.calls).toHaveLength(1);

      // 2 call - added now
      expect(global.console.debug.mock.calls).toHaveLength(2);
      expect(global.console.warn.mock.calls).toHaveLength(2);
      expect(global.console.error.mock.calls).toHaveLength(2); 

      expect(global.console.debug).toHaveBeenCalled();
      expect(global.console.warn).toHaveBeenCalled();
      expect(global.console.error).toHaveBeenCalled();

      // return org console functions
      global.console.debug = orgDebug;
      global.console.warn = orgWarn;
      global.console.error = orgError;
    });

    it('setLogger - override default logger', () => {
      // mock console functions
      const orgDebug = global.console.debug;
      const orgWarn = global.console.warn;
      const orgError = global.console.error;

      global.console.debug = jest.fn();
      global.console.warn = jest.fn();
      global.console.error = jest.fn();

      // set custom logger
      const customLogger = {
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
      };
      setLogLevel(logLevels.DEBUG);
      setLogger('default', customLogger);
     
      // call current logger
      const action = { type: 'INIT', data: { a: 1 } };
      const step = { type: 'START_PROCESSING', uiChange: false };
      const form = { model: { id: 'friends' }, resources: {} };
      const message = 'warning!';
      const error = { a: 2 };

      log.debug({ action, step, form });
      log.warn({ message, form });
      log.error(error);

      // verify new logger logs the messages (and not default logger)
      expect(customLogger.debug.mock.calls).toHaveLength(1);
      expect(customLogger.warn.mock.calls).toHaveLength(1);
      expect(customLogger.error.mock.calls).toHaveLength(1);

      expect(global.console.debug.mock.calls).toHaveLength(0);
      expect(global.console.warn.mock.calls).toHaveLength(0);
      expect(global.console.error.mock.calls).toHaveLength(0);

      expect(customLogger.debug).toHaveBeenCalledWith({ action, step, form });
      expect(customLogger.warn).toHaveBeenCalledWith({ message, form });
      expect(customLogger.error).toHaveBeenCalledWith(error);

      // unset default logger
      setLogger('default');

      // call current logger
      log.debug({ action, step, form });
      log.warn({ message, form });
      log.error(error);

      // verify its not calling to any logger
      // 1 call - from the first call
      expect(customLogger.debug.mock.calls).toHaveLength(1);
      expect(customLogger.warn.mock.calls).toHaveLength(1);
      expect(customLogger.error.mock.calls).toHaveLength(1);

      // 0 call - from the first call
      expect(global.console.debug.mock.calls).toHaveLength(0);
      expect(global.console.warn.mock.calls).toHaveLength(0);
      expect(global.console.error.mock.calls).toHaveLength(0); 

      // return org console functions
      global.console.debug = orgDebug;
      global.console.warn = orgWarn;
      global.console.error = orgError;
    });
  
    it('setLogger - default - only override debug function', () => {
        // mock console functions
        const orgDebug = global.console.debug;
        const orgWarn = global.console.warn;
        const orgError = global.console.error;
  
        global.console.debug = jest.fn();
        global.console.warn = jest.fn();
        global.console.error = jest.fn();
  
        // set custom logger
        const customLogger = {
          debug: jest.fn(),
        };
        setLogLevel(logLevels.DEBUG);
        setLogger('default', customLogger);
       
        // call log actions
        const action = { type: 'INIT', data: { a: 1} };
        const step = { type: 'START_PROCESSING', uiChange: false };
        const form = { model: { id: 'friends' }, resources: {} };
        const message = 'warning!';
        const error = { a: 2 };

  
        log.debug({ action, step, form });
        log.warn({ message, form });
        log.error(error);

        // verify correct logs logs
        expect(customLogger.debug.mock.calls).toHaveLength(1);
  
        expect(global.console.debug.mock.calls).toHaveLength(0);
        expect(global.console.warn.mock.calls).toHaveLength(1);
        expect(global.console.error.mock.calls).toHaveLength(1);
  
        expect(customLogger.debug).toHaveBeenCalledWith({ action, step, form });
  
        expect(global.console.debug).not.toHaveBeenCalled();
        expect(global.console.warn).toHaveBeenCalled();
        expect(global.console.error).toHaveBeenCalled();
  
        // unset default logger
        setLogger('default');
  
        // call current logger
        log.debug({ action, step, form });
        log.warn({ message, form });
        log.error(error);
  
        // verify it calls to default logger (calls to console)
        // 1 call - from the first call
        expect(customLogger.debug.mock.calls).toHaveLength(1);
  
        // 1 call - from the first call
        expect(global.console.debug.mock.calls).toHaveLength(0);
        expect(global.console.warn.mock.calls).toHaveLength(1);
        expect(global.console.error.mock.calls).toHaveLength(1); 

        // return org console functions
        global.console.debug = orgDebug;
        global.console.warn = orgWarn;
        global.console.error = orgError;
    });

    it('setLogger - throws invalid log function', () => {
      // mock console functions
      const orgDebug = global.console.debug;
      const orgWarn = global.console.warn;
      const orgError = global.console.error;

      global.console.debug = jest.fn();
      global.console.warn = jest.fn();
      global.console.error = jest.fn();

      // set custom logger
      let err;
      const customLogger = {
        error: (error) => err = error,
        warn: jest.fn(),
        debug: jest.fn(),
      };
      setLogLevel(logLevels.DEBUG);
      setLogger('custom', customLogger);
      setLogger('custom', { debug: 1 });

      // verify error
      expect(err.code).toEqual(errors.INVALID_LOG_FUNCTION.code);

      // verify logger still last logger functions
      const action = { type: 'INIT', data: { a: 1} };
      const step = { type: 'START_PROCESSING', uiChange: false };
      const form = { model: { id: 'friends' }, resources: {} };
      const message = 'warning!';
      const error = { a: 2 };

      log.debug({ action, step, form });
      log.warn({ message, form });
      log.error(error);

      expect(customLogger.debug).toHaveBeenCalledWith({ action, step, form });
      expect(customLogger.warn).toHaveBeenCalledWith({ message, form });
      expect(err).toEqual(error);

      // unset logger
      setLogger('custom');

      // return org console functions
      global.console.debug = orgDebug;
      global.console.warn = orgWarn;
      global.console.error = orgError;
    });
  });

  describe('setLogLevel', () => {

    const testLogLevel = (expectedLogs) => {
      const form = { model: { id: 'friends' } };

      // error
      const prefix = 'Cofi';
      const error = errors.MISSING_ID;
      const data = { hi: 'shalom' };
      const args = [];
      const subError = undefined;
      const orgError = global.console.error;
      global.console.error = jest.fn();
      log.error(createError(prefix, error, form, data, args, subError));
      expectedLogs.error ? expect(global.console.error).toHaveBeenCalled() : expect(global.console.error).not.toHaveBeenCalled();
      global.console.error = orgError;

      // warn
      const message = 'something is wrong with the left phalange';
      const orgWarn = global.console.warn;
      global.console.warn = jest.fn();
      log.warn({ message, form });
      expectedLogs.warn ? expect(global.console.warn).toHaveBeenCalled() : expect(global.console.warn).not.toHaveBeenCalled();
      global.console.warn = orgWarn;

      // debug
      const action = { type: 'INIT', data: { a: 1 } };
      const step = { type: 'START_PROCESSING', uiChange: false };
      const orgDebug = global.console.debug;
      global.console.debug = jest.fn();
      log.debug({ action, step, form });
      expectedLogs.debug ? expect(global.console.debug).toHaveBeenCalled() : expect(global.console.debug).not.toHaveBeenCalled();
      global.console.debug = orgDebug;
    };
    it('logs according to log level', () => {
      setLogLevel(logLevels.NONE);
      testLogLevel({ error: false, warn: false, debug: false });

      setLogLevel(logLevels.ERROR);
      testLogLevel({ error: true, warn: false, debug: false });

      setLogLevel(logLevels.WARN);
      testLogLevel({ error: true, warn: true, debug: false });
      
      setLogLevel(logLevels.DEBUG);
      testLogLevel({ error: true, warn: true, debug: true });
    });
  
    it('setLogLevel to invalid value', () => {
      expect(setLogLevel(logLevels.ERROR)).toEqual(logLevels.ERROR);
  
      const org = global.console.error;
      global.console.error = jest.fn();
      setLogLevel('bla');
      expect(global.console.error).toHaveBeenCalled();
      global.console.error = org;
    });
  
    it('debug logs ok', () => {
      setLogLevel(logLevels.DEBUG);
      const action = { type: 'INIT', data: { a: 1 } };
      const step = { type: 'START_PROCESSING', uiChange: false };
      const form = { model: { id: 'friends' }, resources: {} };
      const orgDebug = global.console.debug;
      global.console.debug = jest.fn();
      log.debug({ action, step, form });
      expect(global.console.debug).toHaveBeenCalledWith('\nCofi | friends | INIT | START_PROCESSING\n', 
        '', '\n action:', action, '\n step:  ', step, '\n form:  ', form, '\n\n');
      global.console.debug = orgDebug;
    });

    it('debug logs ok - with action undefined', () => {
      setLogLevel(logLevels.DEBUG);
      const step = { type: 'START_PROCESSING', uiChange: false };
      const form = { model: { id: 'friends' }, resources: {} };
      const orgDebug = global.console.debug;
      global.console.debug = jest.fn();
      log.debug({ step, form });
      expect(global.console.debug).toHaveBeenCalledWith('\nCofi | friends | QUEUE | START_PROCESSING\n', 
        '', '\n action:', undefined, '\n step:  ', step, '\n form:  ', form, '\n\n');
      global.console.debug = orgDebug;
    });
  
    it('debug logs ok - with ui update', () => {
      const action = { type: 'INIT', data: { a: 1 } };
      setLogLevel(logLevels.DEBUG);
      const step = { type: 'SET_FIELD_COMPONENT_VALUE', uiChange: true };
      const form = { model: { id: 'friends' }, resources: {} };
      const orgDebug = global.console.debug;
      global.console.debug = jest.fn();
      log.debug({ action, step, form });
      expect(global.console.debug).toHaveBeenCalledWith('\nCofi | friends | INIT | SET_FIELD_COMPONENT_VALUE | %cUI updated\n', 
        'color:#ec44a8;', '\n action:', action, '\n step:  ', step, '\n form:  ', form, '\n\n');
      global.console.debug = orgDebug;
    });
  
    it('debug logs ok - with duration', () => {
      setLogLevel(logLevels.DEBUG);
      const action = { type: 'INIT', data: { a: 1 } };
      const step = { type: 'END_ACTION', uiChange: false, actionMetadata: { start: 50, end: 73 } };
      const form = { model: { id: 'friends' }, resources: {} };
      const orgDebug = global.console.debug;
      global.console.debug = jest.fn();
      log.debug({ action, step, form });
      expect(global.console.debug).toHaveBeenCalledWith('\nCofi | friends | INIT | END_ACTION | %c23 ms\n', 
        'color: #0095ff;', '\n action:', action, '\n step:  ', step, '\n form:  ', form, '\n\n');
      global.console.debug = orgDebug;
    });
  
    it('warn logs ok', () => {
      setLogLevel(logLevels.WARN);
      const message = 'something is wrong with the left phalange';
      const form = { model: { id: 'friends' } };
      const orgWarn = global.console.warn;
      global.console.warn = jest.fn();
      log.warn({ message, form });
      expect(global.console.warn).toHaveBeenCalledWith(`Cofi warning - ${message}`, '\nform: ', form);
      global.console.warn = orgWarn;
    });
  
    it('error logs ok', () => {
      setLogLevel(logLevels.ERROR);
      const prefix = 'Cofi';
      const error = errors.MISSING_ID;
      const form = { a: 1 };
      const data = { hi: 'shalom' };
      const args = [];
      const subError = undefined;
      const orgError = global.console.error;
      global.console.error = jest.fn();
      log.error(createError(prefix, error, form, data, args, subError));
      expect(global.console.error).toHaveBeenCalledWith(
        'Cofi error - "MISSING_ID": Cofi model.id is missing. More info: https://galhavivi.github.com/cofi/docs/error-codes#missing-id.',
        '\nform: ',
        form,
        '\ndata: ',
        data);
      global.console.error = orgError;
    });
  });
});
