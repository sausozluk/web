define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/topic');
  var EntryItemTemplate = require('template!../../templates/components/entry-item');
  var topicController = require('../controllers/topic');
  var ComposeComponent = require('./components/compose');
  var storage = require('storage');

  var EntryItemView = Backbone.View.extend({
    template: EntryItemTemplate,

    tagName: 'li',

    events: {},

    selfDestroy: function (e) {
      e.preventDefault();

      this.model.destroy();
    },

    initialize: function () {
      this.model.on('destroy', this.remove, this);
    },

    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
    },

    renderCompose: function (id) {
      this.composeComponent = new ComposeComponent({id: id});
      $(this.el).find('.entries').after(this.composeComponent.render().el);
    },

    render: function (url, id) {
      topicController.getTopicById(id, (function (topic) {
        $(this.el).html(TopicTemplate(topic.toJSON()));
        this.setTitleAndDescription(topic.get('title'));

        topic.entries.forEach((function (model) {
          var item = new EntryItemView({model: model});
          $(this.el).find('.entries').append(item.render().el);
        }).bind(this));

        if (storage.username) {
          this.renderCompose(id);
        }
      }).bind(this));
    }
  });
});
