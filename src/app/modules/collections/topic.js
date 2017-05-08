define(function (require, exports, module) {
  var BaseCollection = require('./base');
  var TopicModel = require('../models/topic');

  module.exports = BaseCollection.extend({
    url: function () {
      return this.getApiUrl() + '/topics';
    },
    model: TopicModel,
    /**
     * @param collection.data.topics collection.data
     */
    parse: function (collection) {
      this.topics_count = collection.data.topics_count;
      this.entries_count = collection.data.entries_count;
      return collection.data.topics;
    }
  });
});