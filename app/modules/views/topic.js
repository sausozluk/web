define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/topic');

  module.exports = Backbone.View.extend({
    events: {},

    setTagsContent: function (text) {
      document.title = text;
      $('[name="Description"]').attr('content', text);
    },

    render: function (url, id) {
      $(this.el).html(TopicTemplate({title: url}));
      this.setTagsContent(url.replaceAll('-', ' '));
    }
  });
});
