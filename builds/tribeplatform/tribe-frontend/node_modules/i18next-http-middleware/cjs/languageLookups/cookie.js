"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

var serializeCookie = function serializeCookie(name, val, options) {
  var opt = options || {};
  opt.path = opt.path || '/';
  var value = encodeURIComponent(val);
  var str = name + '=' + value;

  if (opt.maxAge > 0) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) str += '; HttpOnly';
  if (opt.secure) str += '; Secure';

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;

      case 'lax':
        str += '; SameSite=Lax';
        break;

      case 'strict':
        str += '; SameSite=Strict';
        break;

      case 'none':
        str += '; SameSite=None';
        break;

      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
};

var _default = {
  name: 'cookie',
  lookup: function lookup(req, res, options) {
    var found;

    if (options.lookupCookie && typeof req !== 'undefined') {
      var cookies = options.getCookies(req);
      if (cookies) found = cookies[options.lookupCookie];
    }

    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(req, res, lng) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (options.lookupCookie && req !== 'undefined') {
      var expirationDate = options.cookieExpirationDate;

      if (!expirationDate) {
        expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }

      var cookieOptions = {
        expires: expirationDate,
        domain: options.cookieDomain,
        path: options.cookiePath,
        httpOnly: false,
        overwrite: true,
        sameSite: options.cookieSameSite
      };
      if (options.cookieSecure) cookieOptions.secure = options.cookieSecure;
      var existingCookie = options.getHeader(res, 'set-cookie') || options.getHeader(res, 'Set-Cookie') || [];
      if (typeof existingCookie === 'string') existingCookie = [existingCookie];
      if (!Array.isArray(existingCookie)) existingCookie = [];
      existingCookie = existingCookie.filter(function (c) {
        return c.indexOf("".concat(options.lookupCookie, "=")) !== 0;
      });
      existingCookie.push(serializeCookie(options.lookupCookie, lng, cookieOptions));
      options.setHeader(res, 'Set-Cookie', existingCookie.length === 1 ? existingCookie[0] : existingCookie);
    }
  }
};
exports.default = _default;
module.exports = exports.default;