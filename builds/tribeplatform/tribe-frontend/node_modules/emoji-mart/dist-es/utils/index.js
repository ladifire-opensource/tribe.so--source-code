import _typeof from "@babel/runtime/helpers/typeof";
import { buildSearch } from './data';
import stringFromCodePoint from '../polyfills/stringFromCodePoint';
import { uncompress } from './data';
var COLONS_REGEX = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
var SKINS = ['1F3FA', '1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'];

function unifiedToNative(unified) {
  var unicodes = unified.split('-'),
      codePoints = unicodes.map(function (u) {
    return "0x".concat(u);
  });
  return stringFromCodePoint.apply(null, codePoints);
}

function sanitize(emoji) {
  var name = emoji.name,
      short_names = emoji.short_names,
      skin_tone = emoji.skin_tone,
      skin_variations = emoji.skin_variations,
      emoticons = emoji.emoticons,
      unified = emoji.unified,
      custom = emoji.custom,
      customCategory = emoji.customCategory,
      imageUrl = emoji.imageUrl,
      id = emoji.id || short_names[0],
      colons = ":".concat(id, ":");

  if (custom) {
    return {
      id: id,
      name: name,
      short_names: short_names,
      colons: colons,
      emoticons: emoticons,
      custom: custom,
      customCategory: customCategory,
      imageUrl: imageUrl
    };
  }

  if (skin_tone) {
    colons += ":skin-tone-".concat(skin_tone, ":");
  }

  return {
    id: id,
    name: name,
    short_names: short_names,
    colons: colons,
    emoticons: emoticons,
    unified: unified.toLowerCase(),
    skin: skin_tone || (skin_variations ? 1 : null),
    "native": unifiedToNative(unified)
  };
}

function getSanitizedData() {
  return sanitize(getData.apply(void 0, arguments));
}

function getData(emoji, skin, set, data) {
  var emojiData = {};

  if (typeof emoji == 'string') {
    var matches = emoji.match(COLONS_REGEX);

    if (matches) {
      emoji = matches[1];

      if (matches[2]) {
        skin = parseInt(matches[2], 10);
      }
    }

    if (data.aliases.hasOwnProperty(emoji)) {
      emoji = data.aliases[emoji];
    }

    if (data.emojis.hasOwnProperty(emoji)) {
      emojiData = data.emojis[emoji];
    } else {
      return null;
    }
  } else if (emoji.id) {
    if (data.aliases.hasOwnProperty(emoji.id)) {
      emoji.id = data.aliases[emoji.id];
    }

    if (data.emojis.hasOwnProperty(emoji.id)) {
      emojiData = data.emojis[emoji.id];
      skin || (skin = emoji.skin);
    }
  }

  if (!Object.keys(emojiData).length) {
    emojiData = emoji;
    emojiData.custom = true;

    if (!emojiData.search) {
      emojiData.search = buildSearch(emoji);
    }
  }

  emojiData.emoticons || (emojiData.emoticons = []);
  emojiData.variations || (emojiData.variations = []);

  if (emojiData.skin_variations && skin > 1) {
    emojiData = JSON.parse(JSON.stringify(emojiData));
    var skinKey = SKINS[skin - 1],
        variationData = emojiData.skin_variations[skinKey];

    if (variationData) {
      if (!variationData.variations && emojiData.variations) {
        delete emojiData.variations;
      }

      if (set && (variationData["has_img_".concat(set)] == undefined || variationData["has_img_".concat(set)]) || !set) {
        emojiData.skin_tone = skin;

        for (var k in variationData) {
          var v = variationData[k];
          emojiData[k] = v;
        }
      }
    }
  }

  if (emojiData.variations && emojiData.variations.length) {
    emojiData = JSON.parse(JSON.stringify(emojiData));
    emojiData.unified = emojiData.variations.shift();
  }

  return emojiData;
}

function getEmojiDataFromNative(nativeString, set, data) {
  if (data.compressed) {
    uncompress(data);
  }

  var skinTones = ['🏻', '🏼', '🏽', '🏾', '🏿'];
  var skinCodes = ['1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'];
  var skin;
  var skinCode;
  var baseNativeString = nativeString;
  skinTones.forEach(function (skinTone, skinToneIndex) {
    if (nativeString.indexOf(skinTone) > 0) {
      skin = skinToneIndex + 2;
      skinCode = skinCodes[skinToneIndex];
    }
  });
  var emojiData;

  for (var id in data.emojis) {
    var emoji = data.emojis[id];
    var emojiUnified = emoji.unified;

    if (emoji.variations && emoji.variations.length) {
      emojiUnified = emoji.variations.shift();
    }

    if (skin && emoji.skin_variations && emoji.skin_variations[skinCode]) {
      emojiUnified = emoji.skin_variations[skinCode].unified;
    }

    if (unifiedToNative(emojiUnified) === baseNativeString) emojiData = emoji;
  }

  if (!emojiData) {
    return null;
  }

  emojiData.id = emojiData.short_names[0];
  return getSanitizedData(emojiData, skin, set, data);
}

function uniq(arr) {
  return arr.reduce(function (acc, item) {
    if (acc.indexOf(item) === -1) {
      acc.push(item);
    }

    return acc;
  }, []);
}

function intersect(a, b) {
  var uniqA = uniq(a);
  var uniqB = uniq(b);
  return uniqA.filter(function (item) {
    return uniqB.indexOf(item) >= 0;
  });
}

function deepMerge(a, b) {
  var o = {};

  for (var key in a) {
    var originalValue = a[key],
        value = originalValue;

    if (b.hasOwnProperty(key)) {
      value = b[key];
    }

    if (_typeof(value) === 'object') {
      value = deepMerge(originalValue, value);
    }

    o[key] = value;
  }

  return o;
} // https://github.com/sonicdoe/measure-scrollbar


function measureScrollbar() {
  if (typeof document == 'undefined') return 0;
  var div = document.createElement('div');
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';
  div.style.position = 'absolute';
  div.style.top = '-9999px';
  document.body.appendChild(div);
  var scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollbarWidth;
} // Use requestIdleCallback() if available, else fall back to setTimeout().
// Throttle so as not to run too frequently.


function throttleIdleTask(func) {
  var doIdleTask = typeof requestIdleCallback === 'function' ? requestIdleCallback : setTimeout;
  var running = false;
  return function throttled() {
    if (running) {
      return;
    }

    running = true;
    doIdleTask(function () {
      running = false;
      func();
    });
  };
}

export { getData, getEmojiDataFromNative, getSanitizedData, uniq, intersect, deepMerge, unifiedToNative, measureScrollbar, throttleIdleTask };