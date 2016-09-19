define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/topic');
  var topicController = require('../controllers/topic');
  var ComposeComponent = require('./components/compose');
  var EntryItemComponent = require('./components/entry-item');
  var storage = require('storage');
  var utils = require('utils');
  var cache = require('cache');
  var moment = require('moment');

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="Description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
    },

    renderCompose: function (model, entries) {
      this.composeComponent = new ComposeComponent({model: model, entries: entries});
      $(this.el).find('.entries').after(this.composeComponent.render().el);
    },

    renderItem: function (model) {
      var item = new EntryItemComponent({model: model});
      $(this.el).find('.entries').append(item.render().el);
    },

    render: function (url, id) {
      topicController.getTopicById(id, (function (topic) {
        var json = topic.toJSON();
        json.site = module.config().site;
        $(this.el).html(TopicTemplate(json));
        this.setTitleAndDescription(topic.get('title'));

        topic.entries.on('add', this.renderItem, this);

        topic.entries.forEach((function (model) {
          var item = new EntryItemComponent({model: model});
          $(this.el).find('.entries').append(item.render().el);
        }).bind(this));

        if (storage.username) {
          this.renderCompose(topic, topic.entries);
        }
      }).bind(this));
    }
  });
});
