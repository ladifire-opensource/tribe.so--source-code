"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.values");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consoleMessage = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/* eslint-disable no-console */
var messageTypes = {
  error: 'error',
  info: 'info',
  warn: 'warn'
};
Object.freeze(messageTypes);

var logMessage = function logMessage(messageType, message) {
  if (Object.values(messageTypes).includes(messageType)) {
    console[messageType](message);
  } else {
    console.info(message);
  }
};

var consoleMessage = function consoleMessage(messageType, message) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config;
  var errorStackTraceLimit = config.errorStackTraceLimit,
      strictMode = config.strictMode;
  var prevStackLimit = Error.stackTraceLimit;
  var util;

  if (!strictMode) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    util = require('util');
  } else {
    return;
  }
  /*
    Temporarily set the stacktrace to 0 or errorStackTraceLimit,
    in order to only display a message
  */


  Error.stackTraceLimit = errorStackTraceLimit;
  /*
    Make room for new message
  */

  console.log();
  /*
    Make sure the message is a string
  */

  if (typeof message !== 'string') {
    var metaError = new Error();
    metaError.name = 'Meta';
    metaError.message = "Param message needs to be of type: string. Instead, '".concat((0, _typeof2["default"])(message), "' was provided.\n\n------------------------------------------------\n\n\u200B\n        The provided ").concat((0, _typeof2["default"])(message), ":\n\n\u200B\n          ").concat(util.inspect(message, true, 8, true), "\n\u200B\n------------------------------------------------\n\n    ");
    console.error(metaError);
    return;
  }
  /*
    Log the message to console
  */


  logMessage(messageType, message);
  /*
    Reset stack limit
  */

  Error.stackTraceLimit = prevStackLimit;
};

exports.consoleMessage = consoleMessage;