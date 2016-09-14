define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LeftFrameTemplate = require('template!../../../templates/components/left-frame');
  var LeftFrameTopicItemTemplate = require('template!../../../templates/components/left-frame-topic-item');
  var topicController = require('../../controllers/topic');
  var cache = require('cache');

  var TopicItemView = Backbone.View.extend({
    template: LeftFrameTopicItemTemplate,

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
    template: LeftFrameTemplate,

    events: {
      'click .more': 'handleClickMore',
      'click .reload-left': 'handleClickReloadLeft'
    },

    tagName: 'div',
    className: 'stairs',

    initialize: function () {
    },

    handleClickMore: function (e) {
      e.preventDefault();

      this.getMoreTopics((function (collection) {
        this.renderCollection(collection);
      }).bind(this));
    },

    handleClickReloadLeft: function (e) {
      e.preventDefault();

      cache.trigger('reload-left');
    },

    detectLastItem: function (collection) {
      if (collection.length) {
        this.lastModelUpdatedAt = collection.at(collection.length - 1).get('updated_at');
      }
    },

    getTopics: function (next) {
      topicController.getTopics((function (collection) {
        this.detectLastItem(collection);
        next(collection);
      }).bind(this));
    },

    getMoreTopics: function (next) {
      if (!this.lastModelUpdatedAt) {
        return;
      }

      topicController.getMoreTopics(this.lastModelUpdatedAt, (function (collection) {
        this.detectLastItem(collection);
        next(collection);
      }).bind(this));
    },

    renderCollection: function (collection) {
      var ul = $(this.el).find('ul');
      collection.forEach((function (model) {
        var item = new TopicItemView({model: model});
        ul.append(item.render().el);
      }).bind(this));
    },

    render: function () {
      this.getTopics((function (topics) {
        $(this.el).html(this.template({
          title: 'bugün',
          subtitle: topics.topics_count + ' başlık, ' + topics.entries_count + ' entry'
        }));

        this.renderCollection(topics);
      }).bind(this));
    }
  });
});
