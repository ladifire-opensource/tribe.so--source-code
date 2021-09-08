"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
var _default = {
  name: 'header',
  lookup: function lookup(req, res, options) {
    var found;

    if (typeof req !== 'undefined') {
      var headers = options.getHeaders(req);
      if (!headers) return found;
      var locales = [];
      var acceptLanguage = options.lookupHeader ? headers[options.lookupHeader] : headers['accept-language'];

      if (acceptLanguage) {
        var lookupRegex = /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi;

        if (acceptLanguage.indexOf('-') > 0) {
          var foundSpecialCase = specialCases.find(function (s) {
            return acceptLanguage.toLowerCase().indexOf("-".concat(s)) > 0;
          });
          if (foundSpecialCase) lookupRegex = /(([a-z]{2})-?([A-Z]{4})?)\s*;?\s*(q=([0-9.]+))?/gi;
        }

        var lngs = [];
        var i;
        var m;
        var rgx = options.lookupHeaderRegex || lookupRegex;

        do {
          m = rgx.exec(acceptLanguage);

          if (m) {
            var lng = m[1];
            var weight = m[5] || '1';
            var q = Number(weight);

            if (lng && !isNaN(q)) {
              lngs.push({
                lng: lng,
                q: q
              });
            }
          }
        } while (m);

        lngs.sort(function (a, b) {
          return b.q - a.q;
        });

        for (i = 0; i < lngs.length; i++) {
          locales.push(lngs[i].lng);
        }

        if (locales.length) found = locales;
      }
    }

    return found;
  }
};
exports.default = _default;
module.exports = exports.default;