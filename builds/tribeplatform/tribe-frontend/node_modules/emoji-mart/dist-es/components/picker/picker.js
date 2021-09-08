import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import data from '../../../data/all.json';
import NimblePicker from './nimble-picker';
import { PickerPropTypes } from '../../utils/shared-props';
import { PickerDefaultProps } from '../../utils/shared-default-props';

var Picker =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Picker, _React$PureComponent);

  function Picker() {
    _classCallCheck(this, Picker);

    return _possibleConstructorReturn(this, _getPrototypeOf(Picker).apply(this, arguments));
  }

  _createClass(Picker, [{
    key: "render",
    value: function render() {
      return React.createElement(NimblePicker, _extends({}, this.props, this.state));
    }
  }]);

  return Picker;
}(React.PureComponent);

export { Picker as default };
Picker.propTypes
/* remove-proptypes */
= PickerPropTypes;
Picker.defaultProps = _objectSpread({}, PickerDefaultProps, {
  data: data
});