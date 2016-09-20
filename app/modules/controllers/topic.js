define(function (require, exports, module) {
  var $ = require('jquery');
  var TopicModel = require('../models/topic');
  var AjaxModel = require('../models/ajax');
  var TopicCollection = require('../collections/topic');
  var RandomCollection = require('../collections/random');
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
    getTopicByIdAndPage: function (id, page, callback) {
      var topicModel = new TopicModel({id: id});

      topicModel.fetch({
        data: $.param({page: page}),
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
    },
    random: function (callback) {
      var randomCollection = new RandomCollection();

      randomCollection.fetch({
        success: function () {
          callback(randomCollection);
        }
      });
    },
    newTopic: function (title, text, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/topics');

      ajaxModel.save({topic: {title: title}, entry: {text: text}}, {
        success: function (model, response) {
          callback(response.entry_id);
        }
      });
    }
  };
});