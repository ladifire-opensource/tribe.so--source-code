"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'path',
  lookup: function lookup(req, res, options) {
    var found;

    if (req === undefined) {
      return found;
    }

    if (options.lookupPath !== undefined && req.params) {
      found = options.getParams(req)[options.lookupPath];
    }

    if (!found && typeof options.lookupFromPathIndex === 'number' && options.getOriginalUrl(req)) {
      var path = options.getOriginalUrl(req).split('?')[0];
      var parts = path.split('/');

      if (parts[0] === '') {
        parts.shift();
      }

      if (parts.length > options.lookupFromPathIndex) {
        found = parts[options.lookupFromPathIndex];
      }
    }

    return found;
  }
};
exports.default = _default;
module.exports = exports.default;