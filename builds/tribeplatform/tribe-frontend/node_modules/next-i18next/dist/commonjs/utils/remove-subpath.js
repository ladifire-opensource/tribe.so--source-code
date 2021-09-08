"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSubpath = void 0;

var removeSubpath = function removeSubpath(url, subpath) {
  return url.replace(subpath, '').replace(/(https?:\/\/)|(\/)+/g, "$1$2");
};

exports.removeSubpath = removeSubpath;