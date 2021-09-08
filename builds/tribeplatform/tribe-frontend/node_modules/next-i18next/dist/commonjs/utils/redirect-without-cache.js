"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redirectWithoutCache = void 0;

var redirectWithoutCache = function redirectWithoutCache(res, Location) {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  res.setHeader('Pragma', 'no-cache');
  res.writeHead(302, {
    Location: Location
  });
  res.end();
};

exports.redirectWithoutCache = redirectWithoutCache;