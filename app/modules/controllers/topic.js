define(function (require, exports, module) {
  var $ = require('jquery');
  var TopicModel = require('../models/topic');
  var TopicCollection = require('../collections/topic');

  module.exports = {
    getTopics: function (data, callback) {
      var topicCollection = new TopicCollection();

      topicCollection.fetch({
        data: $.param({limit: 25}),
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