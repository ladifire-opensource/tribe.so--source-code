"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subpathIsRequired = void 0;

var subpathIsRequired = function subpathIsRequired(config, language) {
  return typeof config.localeSubpaths[language] === 'string';
};

exports.subpathIsRequired = subpathIsRequired;