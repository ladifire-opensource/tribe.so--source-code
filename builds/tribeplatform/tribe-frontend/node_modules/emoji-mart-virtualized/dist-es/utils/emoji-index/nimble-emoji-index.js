import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { getData, getSanitizedData, intersect } from '..';
import { uncompress } from '../data';
import store from '../store';

var NimbleEmojiIndex =
/*#__PURE__*/
function () {
  function NimbleEmojiIndex(data, set) {
    _classCallCheck(this, NimbleEmojiIndex);

    if (data.compressed) {
      uncompress(data);
    }

    this.data = data || {};
    this.set = set || null;
    this.originalPool = {};
    this.index = {};
    this.emojis = {};
    this.emoticons = {};
    this.customEmojisList = [];
    this.buildIndex();
  }

  _createClass(NimbleEmojiIndex, [{
    key: "buildIndex",
    value: function buildIndex() {
      var _this = this;

      var _loop = function _loop(emoji) {
        var emojiData = _this.data.emojis[emoji],
            short_names = emojiData.short_names,
            emoticons = emojiData.emoticons,
            skin_variations = emojiData.skin_variations,
            id = short_names[0];

        if (emoticons) {
          emoticons.forEach(function (emoticon) {
            if (_this.emoticons[emoticon]) {
              return;
            }

            _this.emoticons[emoticon] = id;
          });
        } // If skin variations include them


        if (skin_variations) {
          _this.emojis[id] = {};

          for (var skinTone = 1; skinTone <= 6; skinTone++) {
            _this.emojis[id][skinTone] = getSanitizedData({
              id: id,
              skin: skinTone
            }, skinTone, _this.set, _this.data);
          }
        } else {
          _this.emojis[id] = getSanitizedData(id, null, _this.set, _this.data);
        }

        _this.originalPool[id] = emojiData;
      };

      for (var emoji in this.data.emojis) {
        _loop(emoji);
      }
    }
  }, {
    key: "clearCustomEmojis",
    value: function clearCustomEmojis(pool) {
      var _this2 = this;

      this.customEmojisList.forEach(function (emoji) {
        var emojiId = emoji.id || emoji.short_names[0];
        delete pool[emojiId];
        delete _this2.emojis[emojiId];
      });
    }
  }, {
    key: "addCustomToPool",
    value: function addCustomToPool(custom, pool) {
      var _this3 = this;

      if (this.customEmojisList.length) this.clearCustomEmojis(pool);
      custom.forEach(function (emoji) {
        var emojiId = emoji.id || emoji.short_names[0];

        if (emojiId && !pool[emojiId]) {
          pool[emojiId] = getData(emoji, null, null, _this3.data);
          _this3.emojis[emojiId] = getSanitizedData(emoji, null, null, _this3.data);
        }
      });
      this.customEmojisList = custom;
      this.index = {};
    }
  }, {
    key: "search",
    value: function search(value) {
      var _this4 = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          emojisToShowFilter = _ref.emojisToShowFilter,
          maxResults = _ref.maxResults,
          include = _ref.include,
          exclude = _ref.exclude,
          _ref$custom = _ref.custom,
          custom = _ref$custom === void 0 ? [] : _ref$custom;

      if (this.customEmojisList != custom) this.addCustomToPool(custom, this.originalPool);
      var skinTone = store.get('skin') || 1;
      maxResults || (maxResults = 75);
      include || (include = []);
      exclude || (exclude = []);
      var results = null,
          pool = this.originalPool;

      if (value.length) {
        if (value == '-' || value == '-1') {
          return [this.emojis['-1'][skinTone]];
        }

        var values = value.toLowerCase().split(/[\s|,|\-|_]+/),
            allResults = [];

        if (values.length > 2) {
          values = [values[0], values[1]];
        }

        if (include.length || exclude.length) {
          pool = {};
          this.data.categories.forEach(function (category) {
            var isIncluded = include && include.length ? include.indexOf(category.id) > -1 : true;
            var isExcluded = exclude && exclude.length ? exclude.indexOf(category.id) > -1 : false;

            if (!isIncluded || isExcluded) {
              return;
            }

            category.emojis.forEach(function (emojiId) {
              return pool[emojiId] = _this4.data.emojis[emojiId];
            });
          });

          if (custom.length) {
            var customIsIncluded = include && include.length ? include.indexOf('custom') > -1 : true;
            var customIsExcluded = exclude && exclude.length ? exclude.indexOf('custom') > -1 : false;

            if (customIsIncluded && !customIsExcluded) {
              this.addCustomToPool(custom, pool);
            }
          }
        }

        allResults = values.map(function (value) {
          var aPool = pool,
              aIndex = _this4.index,
              length = 0;

          for (var charIndex = 0; charIndex < value.length; charIndex++) {
            var _char = value[charIndex];
            length++;
            aIndex[_char] || (aIndex[_char] = {});
            aIndex = aIndex[_char];

            if (!aIndex.results) {
              (function () {
                var scores = {};
                aIndex.results = [];
                aIndex.pool = {};

                for (var id in aPool) {
                  var emoji = aPool[id],
                      search = emoji.search,
                      sub = value.substr(0, length),
                      subIndex = search.indexOf(sub);

                  if (subIndex != -1) {
                    var score = subIndex + 1;
                    if (sub == id) score = 0;

                    if (_this4.emojis[id] && _this4.emojis[id][skinTone]) {
                      aIndex.results.push(_this4.emojis[id][skinTone]);
                    } else {
                      aIndex.results.push(_this4.emojis[id]);
                    }

                    aIndex.pool[id] = emoji;
                    scores[id] = score;
                  }
                }

                aIndex.results.sort(function (a, b) {
                  var aScore = scores[a.id],
                      bScore = scores[b.id];

                  if (aScore == bScore) {
                    return a.id.localeCompare(b.id);
                  } else {
                    return aScore - bScore;
                  }
                });
              })();
            }

            aPool = aIndex.pool;
          }

          return aIndex.results;
        }).filter(function (a) {
          return a;
        });

        if (allResults.length > 1) {
          results = intersect.apply(null, allResults);
        } else if (allResults.length) {
          results = allResults[0];
        } else {
          results = [];
        }
      }

      if (results) {
        if (emojisToShowFilter) {
          results = results.filter(function (result) {
            return emojisToShowFilter(pool[result.id]);
          });
        }

        if (results && results.length > maxResults) {
          results = results.slice(0, maxResults);
        }
      }

      return results;
    }
  }]);

  return NimbleEmojiIndex;
}();

export { NimbleEmojiIndex as default };