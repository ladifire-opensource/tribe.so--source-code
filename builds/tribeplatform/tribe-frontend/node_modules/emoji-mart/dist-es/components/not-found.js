import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import NimbleEmoji from './emoji/nimble-emoji';

var NotFound =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(NotFound, _React$PureComponent);

  function NotFound() {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotFound).apply(this, arguments));
  }

  _createClass(NotFound, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          emojiProps = _this$props.emojiProps,
          i18n = _this$props.i18n,
          notFound = _this$props.notFound,
          notFoundEmoji = _this$props.notFoundEmoji;
      var component = notFound && notFound() || React.createElement("div", {
        className: "emoji-mart-no-results"
      }, NimbleEmoji(_objectSpread({
        data: data
      }, emojiProps, {
        size: 38,
        emoji: notFoundEmoji,
        onOver: null,
        onLeave: null,
        onClick: null
      })), React.createElement("div", {
        className: "emoji-mart-no-results-label"
      }, i18n.notfound));
      return component;
    }
  }]);

  return NotFound;
}(React.PureComponent);

export { NotFound as default };
NotFound.propTypes
/* remove-proptypes */
= {
  notFound: PropTypes.func.isRequired,
  emojiProps: PropTypes.object.isRequired
};