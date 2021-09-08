"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lngsToLoad = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var lngsToLoad = function lngsToLoad(initialLng, fallbackLng, otherLanguages) {
  var languages = [];

  if (initialLng) {
    languages.push(initialLng);
  }

  if (fallbackLng) {
    if (typeof fallbackLng === 'string' && fallbackLng !== initialLng) {
      languages.push(fallbackLng);
    }

    if (Array.isArray(fallbackLng)) {
      languages.push.apply(languages, (0, _toConsumableArray2["default"])(fallbackLng));
    } else if (initialLng) {
      if (typeof fallbackLng[initialLng] === 'string') {
        languages.push(fallbackLng[initialLng]);
      } else if (Array.isArray(fallbackLng[initialLng])) {
        languages.push.apply(languages, (0, _toConsumableArray2["default"])(fallbackLng[initialLng]));
      }
    }

    if (fallbackLng["default"]) {
      languages.push(fallbackLng["default"]);
    }
  }

  if (initialLng && initialLng.includes('-') && Array.isArray(otherLanguages)) {
    var _initialLng$split = initialLng.split('-'),
        _initialLng$split2 = (0, _slicedToArray2["default"])(_initialLng$split, 1),
        languageFromLocale = _initialLng$split2[0];

    otherLanguages.forEach(function (otherLanguage) {
      if (otherLanguage === languageFromLocale) {
        languages.push(otherLanguage);
      }
    });
  }

  return languages;
};

exports.lngsToLoad = lngsToLoad;