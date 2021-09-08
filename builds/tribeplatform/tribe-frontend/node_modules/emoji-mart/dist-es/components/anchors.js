import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import PropTypes from 'prop-types';

var Anchors =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Anchors, _React$PureComponent);

  function Anchors(props) {
    var _this;

    _classCallCheck(this, Anchors);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Anchors).call(this, props));
    var defaultCategory = props.categories.filter(function (category) {
      return category.first;
    })[0];
    _this.state = {
      selected: defaultCategory.name
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Anchors, [{
    key: "handleClick",
    value: function handleClick(e) {
      var index = e.currentTarget.getAttribute('data-index');
      var _this$props = this.props,
          categories = _this$props.categories,
          onAnchorClick = _this$props.onAnchorClick;
      onAnchorClick(categories[index], index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          categories = _this$props2.categories,
          color = _this$props2.color,
          i18n = _this$props2.i18n,
          icons = _this$props2.icons,
          selected = this.state.selected;
      return React.createElement("nav", {
        className: "emoji-mart-anchors",
        "aria-label": i18n.categorieslabel
      }, categories.map(function (category, i) {
        var id = category.id,
            name = category.name,
            anchor = category.anchor,
            isSelected = name == selected;

        if (anchor === false) {
          return null;
        }

        var iconId = id.startsWith('custom-') ? 'custom' : id;
        return React.createElement("button", {
          key: id,
          "aria-label": i18n.categories[id],
          title: i18n.categories[id],
          "data-index": i,
          type: 'button',
          onClick: _this2.handleClick,
          className: "emoji-mart-anchor ".concat(isSelected ? 'emoji-mart-anchor-selected' : ''),
          style: {
            color: isSelected ? color : null
          }
        }, React.createElement("div", {
          className: "emoji-mart-anchor-icon"
        }, icons.categories[iconId]()), React.createElement("span", {
          className: "emoji-mart-anchor-bar",
          style: {
            backgroundColor: color
          }
        }));
      }));
    }
  }]);

  return Anchors;
}(React.PureComponent);

export { Anchors as default };
Anchors.propTypes
/* remove-proptypes */
= {
  categories: PropTypes.array,
  onAnchorClick: PropTypes.func,
  icons: PropTypes.object
};
Anchors.defaultProps = {
  categories: [],
  onAnchorClick: function onAnchorClick() {},
  icons: {}
};