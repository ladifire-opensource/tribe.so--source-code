import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import PropTypes from 'prop-types';
import { search as icons } from '../svgs';
import NimbleEmojiIndex from '../utils/emoji-index/nimble-emoji-index';
import { throttleIdleTask } from '../utils/index';
var id = 0;

var Search =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Search, _React$PureComponent);

  function Search(props) {
    var _this;

    _classCallCheck(this, Search);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Search).call(this, props));
    _this.state = {
      icon: icons.search,
      isSearching: false,
      id: ++id
    };
    _this.data = props.data;
    _this.emojiIndex = new NimbleEmojiIndex(_this.data);
    _this.setRef = _this.setRef.bind(_assertThisInitialized(_this));
    _this.clear = _this.clear.bind(_assertThisInitialized(_this));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_this)); // throttle keyboard input so that typing isn't delayed

    _this.handleChange = throttleIdleTask(_this.handleChange.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Search, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // in some cases (e.g. preact) the input may already be pre-populated
      // this.input is undefined in Jest tests
      if (this.input && this.input.value) {
        this.search(this.input.value);
      }
    }
  }, {
    key: "search",
    value: function search(value) {
      if (value == '') this.setState({
        icon: icons.search,
        isSearching: false
      });else this.setState({
        icon: icons["delete"],
        isSearching: true
      });
      this.props.onSearch(this.emojiIndex.search(value, {
        emojisToShowFilter: this.props.emojisToShowFilter,
        maxResults: this.props.maxResults,
        include: this.props.include,
        exclude: this.props.exclude,
        custom: this.props.custom
      }));
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.input.value == '') return;
      this.input.value = '';
      this.input.focus();
      this.search('');
    }
  }, {
    key: "handleChange",
    value: function handleChange() {
      if (this.input) {
        this.search(this.input.value);
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.clear();
      }
    }
  }, {
    key: "setRef",
    value: function setRef(c) {
      this.input = c;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          i18n = _this$props.i18n,
          autoFocus = _this$props.autoFocus;
      var _this$state = this.state,
          icon = _this$state.icon,
          isSearching = _this$state.isSearching,
          id = _this$state.id;
      var inputId = "emoji-mart-search-".concat(id);
      return React.createElement("section", {
        className: "emoji-mart-search",
        "aria-label": i18n.search
      }, React.createElement("input", {
        id: inputId,
        ref: this.setRef,
        type: "search",
        onChange: this.handleChange,
        placeholder: i18n.search,
        autoFocus: autoFocus
      }), React.createElement("label", {
        className: "emoji-mart-sr-only",
        htmlFor: inputId
      }, i18n.search), React.createElement("button", {
        className: "emoji-mart-search-icon",
        onClick: this.clear,
        onKeyUp: this.handleKeyUp,
        "aria-label": i18n.clear,
        disabled: !isSearching
      }, icon()));
    }
  }]);

  return Search;
}(React.PureComponent);

export { Search as default };
Search.propTypes
/* remove-proptypes */
= {
  onSearch: PropTypes.func,
  maxResults: PropTypes.number,
  emojisToShowFilter: PropTypes.func,
  autoFocus: PropTypes.bool
};
Search.defaultProps = {
  onSearch: function onSearch() {},
  maxResults: 75,
  emojisToShowFilter: null,
  autoFocus: false
};