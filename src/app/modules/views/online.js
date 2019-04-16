define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var OnlineTemplate = require('template!../../templates/online');
  var homeController = require('../controllers/home');
  var _ = require('lodash');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    tagName: 'div',

    title: 'kimler ayık',

    description: 'hi justin',

    renderLiItem: function (href, title, text) {
      return '<li><a href="' + href + '" title="#' + title + '">' + text + '</a></li>';
    },

    render: function () {
      analytic.mixpanel('online users view');
      var self = this;

      $(self.el).html(OnlineTemplate());

      homeController.online(function (data) {
        var el = $(self.el).find('.online-users');
        _.each(data, function (item) {
          el.append(self.renderLiItem('/biri/' + item.slug, item.username, item.username));
        });
      });
    }
  });
});
