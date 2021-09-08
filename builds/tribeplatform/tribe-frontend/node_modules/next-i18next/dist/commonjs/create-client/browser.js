"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _cjs = _interopRequireDefault(require("i18next-http-backend/cjs"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _default = function _default(config) {
  var initPromise;

  if (!_i18next["default"].isInitialized) {
    _i18next["default"].use(_cjs["default"]);

    if (config.browserLanguageDetection) {
      var browserDetectors = new _i18nextBrowserLanguagedetector["default"]();
      config.customDetectors.forEach(function (detector) {
        return browserDetectors.addDetector(detector);
      });

      _i18next["default"].use(browserDetectors);
    }

    config.use.forEach(function (x) {
      return _i18next["default"].use(x);
    });
    initPromise = _i18next["default"].init(config);
  }

  return {
    i18n: _i18next["default"],
    initPromise: initPromise
  };
};

exports["default"] = _default;