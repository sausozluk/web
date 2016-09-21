require(['moment', 'libraries/3th/emoji-strip'], function (moment, emojiStrip) {
  moment.locale('tr');

  String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
  };

  String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
  };

  return true;
});