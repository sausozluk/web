define(function (require, exports, module) {
  var BaseCollection = require('./base');
  var TopicModel = require('../models/topic');

  module.exports = BaseCollection.extend({
    isMock: true,
    url: function () {
      return this.getApiUrl() + '/topics';
    },
    model: TopicModel
  });
});