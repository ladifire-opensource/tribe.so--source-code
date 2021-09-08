"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapRouter = void 0;

var _router = _interopRequireDefault(require("next/router"));

var _utils = require("../utils");

/*
  This `Router` is a wrap of the standard
  NextJs `Router`, with some simple lang
  redirect logic in place.

  If you haven't already, read this issue comment:
  https://github.com/zeit/next.js/issues/2833#issuecomment-414919347

  Very important: if you import `Router` from NextJs directly,
  and not this file, your lang subpath routing will break.
*/
var propertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'events'];
var coreMethods = ['reload', 'back', 'beforePopState', 'ready', 'prefetch'];
var wrappedMethods = ['push', 'replace'];

var wrapRouter = function wrapRouter(nextI18NextInternals) {
  var Router = {};
  propertyFields.forEach(function (field) {
    Object.defineProperty(Router, field, {
      get: function get() {
        return _router["default"][field];
      }
    });
  });
  coreMethods.forEach(function (method) {
    Router[method] = function () {
      return _router["default"][method].apply(_router["default"], arguments);
    };
  });
  wrappedMethods.forEach(function (method) {
    Router[method] = function (path, as, options) {
      var config = nextI18NextInternals.config,
          i18n = nextI18NextInternals.i18n;

      if ((0, _utils.subpathIsRequired)(config, i18n.languages[0])) {
        var _lngPathCorrector = (0, _utils.lngPathCorrector)(config, {
          as: as,
          href: path
        }, i18n.languages[0]),
            correctedAs = _lngPathCorrector.as,
            correctedHref = _lngPathCorrector.href;

        return _router["default"][method](correctedHref, correctedAs, options);
      }

      return _router["default"][method](path, as, options);
    };
  });
  return Router;
};

exports.wrapRouter = wrapRouter;