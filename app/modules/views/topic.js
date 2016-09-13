define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');
  var TopicTemplate = require('template!../../templates/topic');
  var EntryItemTemplate = require('template!../../templates/components/entry-item');
  var topicController = require('../controllers/topic');
  var entryController = require('../controllers/entry');
  var ComposeComponent = require('./components/compose');
  var storage = require('storage');
  var utils = require('utils');
  var cache = require('cache');
  var moment = require('moment');

  var EntryItemView = Backbone.View.extend({
    template: EntryItemTemplate,

    tagName: 'li',

    events: {
      'click .up-vote': 'handleClickUpVote',
      'click .down-vote': 'handleClickDownVote',
      'click .remove': 'handleClickRemove'
    },

    updateVotes: function (res) {
      this.model.set({
        'upvotes_count': res.upvotes_count,
        'downvotes_count': res.downvotes_count
      });
    },

    handleClickUpVote: function (e) {
      e.preventDefault();

      entryController.upVote(
        this.model.get('id'), (function (res) {
          this.updateVotes(res.data);
        }).bind(this));
    },

    handleClickRemove: function (e) {
      e.preventDefault();

      if (confirm('eminsin?')) {
        this.selfDestroy();
      }
    },

    handleClickDownVote: function (e) {
      e.preventDefault();

      entryController.downVote(
        this.model.get('id'), (function (res) {
          this.updateVotes(res.data);
        }).bind(this));
    },

    selfDestroy: function () {
      this.model.destroy({
        success: function () {
          utils.doNoty('success', 'ne kadar güzeldi o günler');
          cache.trigger('reload-left');
        }
      });
    },

    initialize: function () {
      this.model.on('destroy', this.remove, this);
      this.model.on('change', this.render, this);
    },

    render: function () {
      var json = this.model.toJSON();
      json.system_id = storage.id;
      json.escape = _.escape;
      json.moment = moment;
      $(this.el).html(this.template(json));
      return this;
    }
  });

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
    },

    renderCompose: function (model, entries) {
      this.composeComponent = new ComposeComponent({model: model, entries: entries});
      $(this.el).find('.entries').after(this.composeComponent.render().el);
    },

    renderItem: function (model) {
      var item = new EntryItemView({model: model});
      $(this.el).find('.entries').append(item.render().el);
    },

    render: function (url, id) {
      topicController.getTopicById(id, (function (topic) {
        $(this.el).html(TopicTemplate(topic.toJSON()));
        this.setTitleAndDescription(topic.get('title'));

        topic.entries.on('add', this.renderItem, this);

        topic.entries.forEach((function (model) {
          var item = new EntryItemView({model: model});
          $(this.el).find('.entries').append(item.render().el);
        }).bind(this));

        if (storage.username) {
          this.renderCompose(topic, topic.entries);
        }
      }).bind(this));
    }
  });
});
