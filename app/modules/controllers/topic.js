define(function (require, exports, module) {
  var TopicModel = require('../models/topic');
  var TopicCollection = require('../collections/topic');

  module.exports = {
    getTopics: function (data, callback) {
      var topicCollection = new TopicCollection();

      topicCollection.fetch({
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
    }
  };
});