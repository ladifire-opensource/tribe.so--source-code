import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import PropTypes from 'prop-types';

var Skins =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Skins, _React$PureComponent);

  function Skins(props) {
    var _this;

    _classCallCheck(this, Skins);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Skins).call(this, props));
    _this.state = {
      opened: false
    };
    return _this;
  }

  _createClass(Skins, [{
    key: "handleClick",
    value: function handleClick(e) {
      var skin = parseInt(e.currentTarget.getAttribute('data-skin'));
      var onChange = this.props.onChange;

      if (!this.state.opened) {
        this.setState({
          opened: true
        });
      } else {
        this.setState({
          opened: false
        });

        if (skin != this.props.skin) {
          onChange(skin);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Skins;
}(React.PureComponent);

export { Skins as default };
Skins.propTypes
/* remove-proptypes */
= {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired
};
Skins.defaultProps = {
  onChange: function onChange() {}
};