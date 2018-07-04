define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ActivitiesTemplate = require('template!../../templates/activities');
  var homeController = require('../controllers/home');
  var _ = require('lodash');
  var moment = require('moment');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    tagName: 'div',

    title: 'neler oluyor?',

    description: 'napıyonuz lan',

    renderLiItem: function (href, title, text) {
      return '<li title="#' + title + '"><a href="' + href + '">' + text + '</a></li>';
    },

    renderLiItemWithData: function (href, title, text, href2, text2) {
      return '<li title="#' + title + '"><a href="' + href + '">' + text + '</a> <a href="' + href2 + '"><u>' + text2 + '</u></a> </li>';
    },

    render: function () {
      analytic.mixpanel('activities view');
      var self = this;

      $(self.el).html(ActivitiesTemplate());

      homeController.activities(function (data) {
        data.sort(function (a, b) {
          var date_a = new Date(a.date);
          var date_b = new Date(b.date);

          return date_b.getTime() - date_a.getTime();
        });

        var el = $(self.el).find('.activities');
        _.each(data, function (item) {
          var slug = item.user.slug;
          var username = item.user.username;
          var entryText = slug === 'igrencespri' ? 'espri yaptı.' : 'entry girdi.';
          var topicText = slug === 'igrencespri' ? 'boş yapıyo.' : 'başlık açtı.';
          var fromNow = moment(item.date).fromNow();

          switch (item.action) {
            case 'login':
              el.append(self.renderLiItem('/biri/' + slug, fromNow, '"' + username + '" giriş yaptı.'));
              break;
            case 'logout':
              el.append(self.renderLiItem('/biri/' + slug, fromNow, '"' + username + '" çıkış yaptı.'));
              break;
            case 'register':
              el.append(self.renderLiItem('/biri/' + slug, fromNow, '"' + username + '" kayıt oldu.'));
              break;
            case 'create_entry':
              el.append(self.renderLiItemWithData('/biri/' + slug, fromNow, '"' + username + '"', '/entry/' + item.data.id, entryText));
              break;
            case 'create_topic':
              el.append(self.renderLiItemWithData('/biri/' + slug, fromNow, '"' + username + '"', '/' + item.data.slug + '--' + item.data.id, topicText));
              break;
          }
        });
      });
    }
  });
});
