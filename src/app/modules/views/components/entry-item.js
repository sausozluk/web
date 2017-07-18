define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');
  var EntryItemTemplate = require('template!../../../templates/components/entry-item');
  var entryController = require('../../controllers/entry');
  var moment = require('moment');
  var storage = require('storage');
  var utils = require('utils');
  var cache = require('cache');
  var app = require('app');
  var notification = require('notification');
  var eventBus = require('eventbus');

  module.exports = Backbone.View.extend({
    template: EntryItemTemplate,

    tagName: 'li',

    text: '',

    events: {
      'click .up-vote': 'handleClickUpVote',
      'click .down-vote': 'handleClickDownVote',
      'click .remove': 'handleClickRemove',
      'click .edit': 'handleClickEdit',
      'click .read-more': 'handleClickReadMore'
    },

    updateVotes: function (res) {
      this.model.set({
        'upvotes_count': res.upvotes_count,
        'downvotes_count': res.downvotes_count
      });
    },

    handleClickReadMore: function (e) {
      e.preventDefault();

      this.render(true);
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

    handleClickEdit: function (e) {
      e.preventDefault();

      window.router.navigate('/entry/duzelt/' + this.model.get('id'), true);
    },

    selfDestroy: function () {
      this.model.destroy({
        success: (function () {
          notification.info('ne kadar güzeldi o günler');
          eventBus.emit('reload-left');
          if (this.single) {
            var topic = this.model.get('topic');
            window.router.navigate('/' + topic.slug + '--' + topic.id, true);
          }
        }).bind(this)
      });
    },

    initialize: function (o) {
      this.model.on('destroy', this.remove, this);
      this.model.on('change', this.render, this);
      this.single = o.single ? o.single : false;
    },

    strCleaner: function (str) {
      return utils.br(utils.link(utils.yildiz(utils.bkz(_.escape(emoticon(str))))));
    },

    render: function (expanded) {
      var json = this.model.toJSON();
      var isExpanded = expanded ? expanded : json.text.length < 501;
      json.system_id = storage.id;
      json.isMod = storage.permission > 0;
      json.canivote = storage.id ? storage.id !== json.user.id : false;
      json.text = this.strCleaner(json.text);
      this.text = json.text;
      json.moment = moment;
      json.expanded = isExpanded;
      $(this.el).html(this.template(json));
      return this;
    }
  });
});