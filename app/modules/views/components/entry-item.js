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

  module.exports = Backbone.View.extend({
    template: EntryItemTemplate,

    tagName: 'li',

    events: {
      'click .up-vote': 'handleClickUpVote',
      'click .down-vote': 'handleClickDownVote',
      'click .remove': 'handleClickRemove',
      'click .edit': 'handleClickEdit'
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

    handleClickEdit: function (e) {
      e.preventDefault();

      app.router.navigate('/entry/duzelt/' + this.model.get('id'), true);
    },

    selfDestroy: function () {
      this.model.destroy({
        success: (function () {
          utils.doNoty('success', 'ne kadar güzeldi o günler');
          cache.trigger('reload-left');
          if (this.single) {
            var topic = this.model.get('topic');
            app.router.navigate('/' + topic.slug + '--' + topic.id, true);
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

    render: function () {
      var json = this.model.toJSON();
      json.system_id = storage.id;
      json.canivote = storage.id ? storage.id !== json.user.id : false;
      json.cleaner = this.strCleaner;
      json.moment = moment;
      $(this.el).html(this.template(json));
      return this;
    }
  });
});