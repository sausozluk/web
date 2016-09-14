define(function (require, exports, module) {
  var $ = require('jquery');
  var TopicModel = require('../models/topic');
  var TopicCollection = require('../collections/topic');
  var limit = module.config().topicLimit;

  module.exports = {
    getTopics: function (callback) {
      var topicCollection = new TopicCollection();

      topicCollection.fetch({
        data: $.param({count: limit}),
        success: function () {
          callback(topicCollection);
        }
      });
    },
    getTopicById: function (id, callback) {
      var topicModel = new TopicModel({id: id});

      topicModel.fetch({
        success: function () {
          callback(topicModel);
        }
      });
    },
    getMoreTopics: function (time, callback) {
      var topicCollection = new TopicCollection();

      topicCollection.fetch({
        data: $.param({count: limit, timestamp: time}),
        success: function () {
          callback(topicCollection);
        }
      });
    }
  };
});