"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subpathFromLng = void 0;

var subpathFromLng = function subpathFromLng(config, language) {
  if (typeof language !== 'string') {
    return null;
  }

  var subpath = config.localeSubpaths[language];

  if (typeof subpath !== 'string') {
    return null;
  }

  return subpath;
};

exports.subpathFromLng = subpathFromLng;