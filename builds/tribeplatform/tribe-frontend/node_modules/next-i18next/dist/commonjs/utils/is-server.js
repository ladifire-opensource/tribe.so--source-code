"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isServer = void 0;

var isServer = function isServer() {
  return typeof window === 'undefined';
};

exports.isServer = isServer;