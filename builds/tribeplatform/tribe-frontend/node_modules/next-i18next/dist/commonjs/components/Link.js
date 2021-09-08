"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _link = _interopRequireDefault(require("next/link"));

var _reactI18next = require("react-i18next");

var _utils = require("../utils");

/*
  This `Link` component is a wrap of the standard
  NextJs `Link` component, with some simple lang
  redirect logic in place.

  If you haven't already, read this issue comment:
  https://github.com/zeit/next.js/issues/2833#issuecomment-414919347

  This component automatically provides this functionality:
  <Link href="/product?slug=something" as="/products/something">

  Wherein `slug` is actually our i18n lang, and it gets
  pulled automatically.

  Very important: if you import `Link` from NextJs directly,
  and not this file, your lang subpath routing will break.
*/
var removeWithTranslationProps = function removeWithTranslationProps(props) {
  var strippedProps = Object.assign({}, props);
  delete strippedProps.defaultNS;
  delete strippedProps.i18n;
  delete strippedProps.i18nOptions;
  delete strippedProps.lng;
  delete strippedProps.reportNS;
  delete strippedProps.t;
  delete strippedProps.tReady;
  delete strippedProps.forwardedRef;
  return strippedProps;
};

var Link = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Link, _React$Component);

  function Link() {
    (0, _classCallCheck2["default"])(this, Link);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Link).apply(this, arguments));
  }

  (0, _createClass2["default"])(Link, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          as = _this$props.as,
          children = _this$props.children,
          href = _this$props.href,
          i18n = _this$props.i18n,
          nextI18NextInternals = _this$props.nextI18NextInternals,
          props = (0, _objectWithoutProperties2["default"])(_this$props, ["as", "children", "href", "i18n", "nextI18NextInternals"]);
      var config = nextI18NextInternals.config;
      var language = i18n.language;

      if ((0, _utils.subpathIsRequired)(config, language)) {
        var _lngPathCorrector = (0, _utils.lngPathCorrector)(config, {
          as: as,
          href: href
        }, language),
            correctedAs = _lngPathCorrector.as,
            correctedHref = _lngPathCorrector.href;

        return _react["default"].createElement(_link["default"], (0, _extends2["default"])({
          href: correctedHref,
          as: correctedAs
        }, removeWithTranslationProps(props)), children);
      }

      return _react["default"].createElement(_link["default"], (0, _extends2["default"])({
        href: href,
        as: as
      }, removeWithTranslationProps(props)), children);
    }
  }]);
  return Link;
}(_react["default"].Component);
/*
  Usage of `withTranslation` here is just to
  force `Link` to rerender on language change
*/


(0, _defineProperty2["default"])(Link, "propTypes", {
  as: _propTypes["default"].string,
  children: _propTypes["default"].node.isRequired,
  href: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
  nextI18NextInternals: _propTypes["default"].shape({
    config: _propTypes["default"].shape({
      defaultLanguage: _propTypes["default"].string.isRequired,
      localeSubpaths: _propTypes["default"].object.isRequired
    }).isRequired
  }).isRequired
});
(0, _defineProperty2["default"])(Link, "defaultProps", {
  as: undefined
});

var _default = (0, _reactI18next.withTranslation)()(Link);

exports["default"] = _default;