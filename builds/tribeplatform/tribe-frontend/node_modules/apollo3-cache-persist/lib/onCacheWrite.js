export default (function (_a) {
    var cache = _a.cache;
    return function (persist) {
        var write = cache.write;
        var evict = cache.evict;
        var modify = cache.modify;
        cache.write = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = write.apply(cache, args);
            persist();
            return result;
        };
        cache.evict = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = evict.apply(cache, args);
            persist();
            return result;
        };
        cache.modify = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = modify.apply(cache, args);
            persist();
            return result;
        };
        return function () {
            cache.write = write;
            cache.evict = evict;
            cache.modify = modify;
        };
    };
});
//# sourceMappingURL=onCacheWrite.js.map