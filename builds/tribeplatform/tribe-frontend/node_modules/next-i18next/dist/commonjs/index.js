"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.function.bind");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "I18nContext", {
  enumerable: true,
  get: function get() {
    return _reactI18next.I18nContext;
  }
});
Object.defineProperty(exports, "withTranslation", {
  enumerable: true,
  get: function get() {
    return _reactI18next.withTranslation;
  }
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reactI18next = require("react-i18next");

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _createConfig = require("./config/create-config");

var _createClient = _interopRequireDefault(require("./create-client"));

var _hocs = require("./hocs");

var _utils = require("./utils");

var _components = require("./components");

var _router = require("./router");

var NextI18Next = function NextI18Next(userConfig) {
  (0, _classCallCheck2["default"])(this, NextI18Next);
  (0, _defineProperty2["default"])(this, "Trans", void 0);
  (0, _defineProperty2["default"])(this, "Link", void 0);
  (0, _defineProperty2["default"])(this, "Router", void 0);
  (0, _defineProperty2["default"])(this, "i18n", void 0);
  (0, _defineProperty2["default"])(this, "initPromise", void 0);
  (0, _defineProperty2["default"])(this, "config", void 0);
  (0, _defineProperty2["default"])(this, "useTranslation", void 0);
  (0, _defineProperty2["default"])(this, "withTranslation", void 0);
  (0, _defineProperty2["default"])(this, "appWithTranslation", void 0);
  (0, _defineProperty2["default"])(this, "consoleMessage", void 0);
  (0, _defineProperty2["default"])(this, "withNamespaces", void 0);
  this.config = (0, _createConfig.createConfig)(userConfig);
  this.consoleMessage = _utils.consoleMessage.bind(this);
  /* Validation */

  this.withNamespaces = function () {
    throw new Error('next-i18next has upgraded to react-i18next v10 - please rename withNamespaces to withTranslation.');
  };

  var _createI18NextClient = (0, _createClient["default"])(this.config),
      i18n = _createI18NextClient.i18n,
      initPromise = _createI18NextClient.initPromise;

  this.i18n = i18n;
  this.initPromise = initPromise;
  this.appWithTranslation = _hocs.appWithTranslation.bind(this);

  this.withTranslation = function (namespace, options) {
    return function (Component) {
      return (0, _hoistNonReactStatics["default"])((0, _reactI18next.withTranslation)(namespace, options)(Component), Component);
    };
  };

  var nextI18NextInternals = {
    config: this.config,
    i18n: this.i18n
  };
  this.Link = (0, _hocs.withInternals)(_components.Link, nextI18NextInternals);
  this.Router = (0, _router.wrapRouter)(nextI18NextInternals);
  /* Directly export `react-i18next` methods */

  this.Trans = _reactI18next.Trans;
  this.useTranslation = _reactI18next.useTranslation;
};

exports["default"] = NextI18Next;