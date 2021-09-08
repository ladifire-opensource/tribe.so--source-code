import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import PropTypes from 'prop-types';
import Skins from './skins';

var SkinsDot =
/*#__PURE__*/
function (_Skins) {
  _inherits(SkinsDot, _Skins);

  function SkinsDot(props) {
    var _this;

    _classCallCheck(this, SkinsDot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SkinsDot).call(this, props));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SkinsDot, [{
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      // if either enter or space is pressed, then execute
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.handleClick(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          skin = _this$props.skin,
          i18n = _this$props.i18n;
      var opened = this.state.opened;
      var skinToneNodes = [];

      for (var skinTone = 1; skinTone <= 6; skinTone++) {
        var selected = skinTone === skin;
        var visible = opened || selected;
        skinToneNodes.push(React.createElement("span", _extends({
          key: "skin-tone-".concat(skinTone),
          className: "emoji-mart-skin-swatch".concat(selected ? ' selected' : ''),
          "aria-label": i18n.skintones[skinTone],
          "aria-hidden": !visible
        }, opened ? {
          role: 'menuitem'
        } : {}), React.createElement("span", _extends({
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          role: "button"
        }, selected ? {
          'aria-haspopup': true,
          'aria-expanded': !!opened
        } : {}, opened ? {
          'aria-pressed': !!selected
        } : {}, {
          tabIndex: visible ? '0' : '',
          "aria-label": i18n.skintones[skinTone],
          title: i18n.skintones[skinTone],
          "data-skin": skinTone,
          className: "emoji-mart-skin emoji-mart-skin-tone-".concat(skinTone)
        }))));
      }

      return React.createElement("section", {
        className: "emoji-mart-skin-swatches".concat(opened ? ' opened' : ''),
        "aria-label": i18n.skintext
      }, React.createElement("div", opened ? {
        role: 'menubar'
      } : {}, skinToneNodes));
    }
  }]);

  return SkinsDot;
}(Skins);

export { SkinsDot as default };
SkinsDot.propTypes
/* remove-proptypes */
= {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  i18n: PropTypes.object
};
SkinsDot.defaultProps = {
  onChange: function onChange() {}
};