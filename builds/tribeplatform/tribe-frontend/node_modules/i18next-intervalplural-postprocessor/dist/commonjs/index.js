'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function intervalMatches(interval, count) {
  if (interval.indexOf('-') > -1) {
    var p = interval.split('-');
    if (p[1] === 'inf') {
      var from = parseInt(p[0], 10);
      return count >= from;
    } else {
      var _from = parseInt(p[0], 10);
      var to = parseInt(p[1], 10);
      return count >= _from && count <= to;
    }
  } else {
    var match = parseInt(interval, 10);
    return match === count;
  }
}

exports.default = {
  name: 'interval',
  type: 'postProcessor',

  options: {
    intervalSeparator: ';',
    intervalRegex: /\((\S*)\).*?\[((.|\n)*)\]/,
    intervalSuffix: '_interval'
  },

  setOptions: function setOptions(options) {
    this.options = _extends({}, this.options, options);
  },
  process: function process(value, key, options, translator) {
    var _this = this;

    var p = value.split(this.options.intervalSeparator);

    var found = void 0;
    p.forEach(function (iv) {
      if (found) return;
      var match = _this.options.intervalRegex.exec(iv);

      if (match && intervalMatches(match[1], options.count || 0)) {
        found = match[2];
      }
    });

    // not found fallback to classical plural
    if (!found) {
      var newOptions = _extends({}, options);
      if (typeof newOptions.postProcess === 'string') {
        delete newOptions.postProcess;
      } else {
        var index = newOptions.postProcess.indexOf('interval'); // <-- Not supported in <IE9
        if (index !== -1) newOptions.postProcess.splice(index, 1);
      }

      var newKeys = void 0;
      if (typeof key === 'string') {
        newKeys = key.replace(this.options.intervalSuffix, '');
      } else if (key.length > -1) {
        newKeys = key.map(function (k) {
          return k.replace(_this.options.intervalSuffix, '');
        });
      }
      if (newKeys) found = translator.translate(newKeys, newOptions);
    }

    return found || value;
  }
};