import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { getData, getSanitizedData, unifiedToNative } from '../../utils';
import { uncompress } from '../../utils/data';
import { EmojiPropTypes } from '../../utils/shared-props';
import { EmojiDefaultProps } from '../../utils/shared-default-props';

var _getData = function _getData(props) {
  var emoji = props.emoji,
      skin = props.skin,
      set = props.set,
      data = props.data;
  return getData(emoji, skin, set, data);
};

var _getPosition = function _getPosition(props) {
  var _getData2 = _getData(props),
      sheet_x = _getData2.sheet_x,
      sheet_y = _getData2.sheet_y,
      multiplyX = 100 / (props.sheetColumns - 1),
      multiplyY = 100 / (props.sheetRows - 1);

  return "".concat(multiplyX * sheet_x, "% ").concat(multiplyY * sheet_y, "%");
};

var _getSanitizedData = function _getSanitizedData(props) {
  var emoji = props.emoji,
      skin = props.skin,
      set = props.set,
      data = props.data;
  return getSanitizedData(emoji, skin, set, data);
};

var _handleClick = function _handleClick(e, props) {
  if (!props.onClick) {
    return;
  }

  var onClick = props.onClick,
      emoji = _getSanitizedData(props);

  onClick(emoji, e);
};

var _handleOver = function _handleOver(e, props) {
  if (!props.onOver) {
    return;
  }

  var onOver = props.onOver,
      emoji = _getSanitizedData(props);

  onOver(emoji, e);
};

var _handleLeave = function _handleLeave(e, props) {
  if (!props.onLeave) {
    return;
  }

  var onLeave = props.onLeave,
      emoji = _getSanitizedData(props);

  onLeave(emoji, e);
};

var _isNumeric = function _isNumeric(value) {
  return !isNaN(value - parseFloat(value));
};

var _convertStyleToCSS = function _convertStyleToCSS(style) {
  var div = document.createElement('div');

  for (var key in style) {
    var value = style[key];

    if (_isNumeric(value)) {
      value += 'px';
    }

    div.style[key] = value;
  }

  return div.getAttribute('style');
};

var NimbleEmoji = function NimbleEmoji(props) {
  if (props.data.compressed) {
    uncompress(props.data);
  }

  for (var k in NimbleEmoji.defaultProps) {
    if (props[k] == undefined && NimbleEmoji.defaultProps[k] != undefined) {
      props[k] = NimbleEmoji.defaultProps[k];
    }
  }

  var data = _getData(props);

  if (!data) {
    if (props.fallback) {
      return props.fallback(null, props);
    } else {
      return null;
    }
  }

  var unified = data.unified,
      custom = data.custom,
      short_names = data.short_names,
      imageUrl = data.imageUrl,
      style = {},
      children = props.children,
      className = 'emoji-mart-emoji',
      nativeEmoji = unified && unifiedToNative(unified),
      label = [nativeEmoji].concat(short_names).filter(Boolean).join(', '),
      title = null;

  if (!unified && !custom) {
    if (props.fallback) {
      return props.fallback(data, props);
    } else {
      return null;
    }
  }

  if (props.tooltip) {
    title = short_names[0];
  }

  if (props["native"] && unified) {
    className += ' emoji-mart-emoji-native';
    style = {
      fontSize: props.size
    };
    children = nativeEmoji;

    if (props.forceSize) {
      style.display = 'inline-block';
      style.width = props.size;
      style.height = props.size;
      style.wordBreak = 'keep-all';
    }
  } else if (custom) {
    className += ' emoji-mart-emoji-custom';
    style = {
      width: props.size,
      height: props.size,
      display: 'inline-block'
    };

    if (data.spriteUrl) {
      style = _objectSpread({}, style, {
        backgroundImage: "url(".concat(data.spriteUrl, ")"),
        backgroundSize: "".concat(100 * props.sheetColumns, "% ").concat(100 * props.sheetRows, "%"),
        backgroundPosition: _getPosition(props)
      });
    } else {
      style = _objectSpread({}, style, {
        backgroundImage: "url(".concat(imageUrl, ")"),
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      });
    }
  } else {
    var setHasEmoji = data["has_img_".concat(props.set)] == undefined || data["has_img_".concat(props.set)];

    if (!setHasEmoji) {
      if (props.fallback) {
        return props.fallback(data, props);
      } else {
        return null;
      }
    } else {
      style = {
        width: props.size,
        height: props.size,
        display: 'inline-block',
        backgroundImage: "url(".concat(props.backgroundImageFn(props.set, props.sheetSize), ")"),
        backgroundSize: "".concat(100 * props.sheetColumns, "% ").concat(100 * props.sheetRows, "%"),
        backgroundPosition: _getPosition(props)
      };
    }
  }

  var Tag = {
    name: 'span',
    props: {}
  };

  if (props.onClick && props.useButton) {
    Tag.name = 'button';
    Tag.props = {
      type: 'button'
    };
  }

  if (props.html) {
    style = _convertStyleToCSS(style);
    return "<".concat(Tag.name, " style='").concat(style, "' aria-label='").concat(label, "' ").concat(title ? "title='".concat(title, "'") : '', " class='").concat(className, "'>").concat(children || '', "</").concat(Tag.name, ">");
  } else {
    return React.createElement(Tag.name, _extends({
      onClick: function onClick(e) {
        return _handleClick(e, props);
      },
      onMouseEnter: function onMouseEnter(e) {
        return _handleOver(e, props);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _handleLeave(e, props);
      },
      "aria-label": label,
      title: title,
      className: className
    }, Tag.props), React.createElement("span", {
      style: style
    }, children));
  }
};

NimbleEmoji.propTypes
/* remove-proptypes */
= _objectSpread({}, EmojiPropTypes, {
  data: PropTypes.object.isRequired
});
NimbleEmoji.defaultProps = EmojiDefaultProps;
export default NimbleEmoji;