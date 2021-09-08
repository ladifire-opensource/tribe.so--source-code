"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lngFromReq = void 0;

var lngFromReq = function lngFromReq(req) {
  if (!req.i18n) {
    return null;
  }

  var _req$i18n$options = req.i18n.options,
      allLanguages = _req$i18n$options.allLanguages,
      defaultLanguage = _req$i18n$options.defaultLanguage,
      fallbackLng = _req$i18n$options.fallbackLng;
  var fallback = fallbackLng || defaultLanguage;

  if (!req.i18n.languages) {
    return typeof fallback === 'string' ? fallback : null;
  }

  var language = req.i18n.languages.find(function (l) {
    return allLanguages.includes(l);
  }) || fallback;

  if (typeof language === 'string') {
    return language;
  }

  return null;
};

exports.lngFromReq = lngFromReq;