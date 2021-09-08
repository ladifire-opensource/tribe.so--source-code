import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import data from '../../../data/all.json';
import NimbleEmoji from './nimble-emoji';
import { EmojiPropTypes } from '../../utils/shared-props';
import { EmojiDefaultProps } from '../../utils/shared-default-props';

var Emoji = function Emoji(props) {
  for (var k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k];
    }
  }

  return NimbleEmoji(_objectSpread({}, props));
};

Emoji.propTypes
/* remove-proptypes */
= EmojiPropTypes;
Emoji.defaultProps = _objectSpread({}, EmojiDefaultProps, {
  data: data
});
export default Emoji;