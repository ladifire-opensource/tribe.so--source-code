"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'querystring',
  lookup: function lookup(req, res, options) {
    var found;

    if (options.lookupQuerystring !== undefined && typeof req !== 'undefined') {
      if (options.getQuery(req)) {
        found = options.getQuery(req)[options.lookupQuerystring];
      }

      if (!found && options.getUrl(req) && options.getUrl(req).indexOf('?')) {
        var lastPartOfUri = options.getUrl(req).substring(options.getUrl(req).indexOf('?'));

        if (typeof URLSearchParams !== 'undefined') {
          var urlParams = new URLSearchParams(lastPartOfUri);
          found = urlParams.get(options.lookupQuerystring);
        } else {
          var indexOfQsStart = lastPartOfUri.indexOf("".concat(options.lookupQuerystring, "="));

          if (indexOfQsStart > -1) {
            var restOfUri = lastPartOfUri.substring(options.lookupQuerystring.length + 2);

            if (restOfUri.indexOf('&') < 0) {
              found = restOfUri;
            } else {
              found = restOfUri.substring(0, restOfUri.indexOf('&'));
            }
          }
        }
      }
    }

    return found;
  }
};
exports.default = _default;
module.exports = exports.default;