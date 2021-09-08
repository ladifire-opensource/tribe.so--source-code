"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = {
  name: 'session',
  lookup: function lookup(req, res, options) {
    var found;

    if (options.lookupSession !== undefined && _typeof(req) && options.getSession(req)) {
      found = options.getSession(req)[options.lookupSession];
    }

    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(req, res, lng) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (options.lookupSession && req && options.getSession(req)) {
      options.getSession(req)[options.lookupSession] = lng;
    }
  }
};
exports.default = _default;
module.exports = exports.default;