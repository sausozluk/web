define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/topic');
  var topicController = require('../controllers/topic');

  module.exports = Backbone.View.extend({
    events: {},

    setTagsContent: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
    },

    render: function (url, id) {
      topicController.getTopicById(id, (function (topic) {
        $(this.el).html(TopicTemplate(topic.toJSON()));
        this.setTagsContent(topic.get('title'));
      }).bind(this));
    }
  });
});
