import data from '../../../data/all.json';
import NimbleEmojiIndex from './nimble-emoji-index';
var emojiIndex = new NimbleEmojiIndex(data);
var emojis = emojiIndex.emojis,
    emoticons = emojiIndex.emoticons;

function search() {
  return emojiIndex.search.apply(emojiIndex, arguments);
}

export default {
  search: search,
  emojis: emojis,
  emoticons: emoticons
};