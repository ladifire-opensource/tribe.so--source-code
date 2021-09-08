"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.every");

require("core-js/modules/es.array.find");

require("core-js/modules/es.string.starts-with");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _cjs = _interopRequireDefault(require("i18next-http-middleware/cjs"));

var _utils = require("../utils");

function _default(nexti18next) {
  var config = nexti18next.config,
      i18n = nexti18next.i18n;
  var allLanguages = config.allLanguages,
      ignoreRoutes = config.ignoreRoutes;

  var isI18nRoute = function isI18nRoute(req) {
    return ignoreRoutes.every(function (x) {
      return !req.url.startsWith(x);
    });
  };

  var middleware = [];
  /*
    If not using server side language detection,
    we need to manually set the language for
    each request
  */

  if (!config.serverLanguageDetection) {
    middleware.push(function (req, _res, next) {
      if (isI18nRoute(req)) {
        req.lng = config.defaultLanguage;
      }

      next();
    });
  }
  /*
    This does the bulk of the i18next work
  */


  middleware.push(_cjs["default"].handle(i18n));
  /*
    This does the locale subpath work
  */

  middleware.push(function (req, res, next) {
    if (isI18nRoute(req) && req.i18n) {
      var currentLng = (0, _utils.lngFromReq)(req);
      var currentLngSubpath = (0, _utils.subpathFromLng)(config, currentLng);
      var currentLngRequiresSubpath = (0, _utils.subpathIsRequired)(config, currentLng);
      var currentLngSubpathIsPresent = (0, _utils.subpathIsPresent)(req.url, currentLngSubpath);
      var lngFromCurrentSubpath = allLanguages.find(function (l) {
        return (0, _utils.subpathIsPresent)(req.url, (0, _utils.subpathFromLng)(config, l));
      });

      if (lngFromCurrentSubpath !== undefined && lngFromCurrentSubpath !== currentLng) {
        /*
          If a user has hit a subpath which does not
          match their language, give preference to
          the path, and change user language.
        */
        req.i18n.changeLanguage(lngFromCurrentSubpath);
        currentLng = lngFromCurrentSubpath;
      } else if (currentLngRequiresSubpath && !currentLngSubpathIsPresent) {
        /*
          If a language subpath is required and
          not present, prepend correct subpath
        */
        return (0, _utils.redirectWithoutCache)(res, (0, _utils.addSubpath)(req.url, currentLngSubpath));
      }
    }

    next();
  });
  return middleware;
}