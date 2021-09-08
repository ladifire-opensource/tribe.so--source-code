var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Log = (function () {
    function Log(options) {
        var _a = options.debug, debug = _a === void 0 ? false : _a;
        this.debug = debug;
        this.lines = [];
    }
    Log.prototype.emit = function (level, message) {
        if (level in console) {
            var prefix = Log.prefix;
            console[level].apply(console, __spreadArrays([prefix], message));
        }
    };
    Log.prototype.tailLogs = function () {
        var _this = this;
        this.lines.forEach(function (_a) {
            var level = _a[0], message = _a[1];
            return _this.emit(level, message);
        });
    };
    Log.prototype.getLogs = function () {
        return this.lines;
    };
    Log.prototype.write = function (level, message) {
        var buffer = Log.buffer;
        this.lines = __spreadArrays(this.lines.slice(1 - buffer), [[level, message]]);
        if (this.debug || level !== 'log') {
            this.emit(level, message);
        }
    };
    Log.prototype.info = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.write('log', message);
    };
    Log.prototype.warn = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.write('warn', message);
    };
    Log.prototype.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.write('error', message);
    };
    Log.buffer = 30;
    Log.prefix = '[apollo-cache-persist]';
    return Log;
}());
export default Log;
//# sourceMappingURL=Log.js.map