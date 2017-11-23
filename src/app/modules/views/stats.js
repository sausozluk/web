define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var StatsTemplate = require('template!../../templates/stats');
  var GeneralStatTemplate = require('template!../../templates/components/general-stat');
  var statController = require('../controllers/stat');
  var _ = require('lodash');
  var moment = require('moment');

  module.exports = Backbone.View.extend({
    tagName: 'div',

    title: 'istatistikler',

    description: 'oo kimler akıyor bakalım',

    renderLiItem: function (href, title, text) {
      return '<li><a href="' + href + '" title="#' + title + '">' + text + '</a></li>';
    },

    render: function () {
      var self = this;

      $(self.el).html(StatsTemplate());

      statController.getMostWriterUsers(function (data) {
        var el = $(self.el).find('.most-writer-users');
        _.each(data, function (item) {
          el.append(self.renderLiItem('/biri/' + item.user.slug, item.user.username, item.user.username + ' # ' + item.entry_count));
        });
      });

      statController.getMostUpVotedEntries(function (data) {
        var el = $(self.el).find('.most-up-voted-entries');
        _.each(data, function (item) {
          el.append(self.renderLiItem('/entry/' + item.id, item.id, item.topic.title + ' # ' + item.like_count));
        });
      });

      statController.getMostUpVotedUsers(function (data) {
        var el = $(self.el).find('.most-up-voted-users');
        _.each(data, function (item) {
          el.append(self.renderLiItem('/biri/' + item._id.slug, item._id.username, item._id.username + ' # ' + item.count));
        });
      });

      statController.getNewUsers(function (data) {
        var el = $(self.el).find('.new-users');
        _.each(data, function (item) {
          el.append(self.renderLiItem('/biri/' + item.slug, item.username, item.username + ' # ' + moment(item.createdAt).fromNow()));
        });
      });

      statController.getGeneral(function (data) {
        var el = $(self.el).find('.general');
        el.html(GeneralStatTemplate(data));
      });
    }
  });
});
