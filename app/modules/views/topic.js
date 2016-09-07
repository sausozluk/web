define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/topic');

  module.exports = Backbone.View.extend({
    events: {
    },

    render: function (url, id) {
      $(this.el).html(TopicTemplate({title: url}));
    }
  });
});
