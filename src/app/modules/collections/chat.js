define(function (require, exports, module) {
  var BaseCollection = require('./base');
  var ChatModel = require('../models/chat');

  module.exports = BaseCollection.extend({
    url: function () {
      return this.getApiUrl() + '/chats';
    },
    model: ChatModel
  });
});