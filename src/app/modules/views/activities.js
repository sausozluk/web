define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ActivitiesTemplate = require('template!../../templates/activities');
  var homeController = require('../controllers/home');
  var _ = require('lodash');
  var moment = require('moment');

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
          var entryText = item.user.slug === 'igrencespri' ? 'espri yaptı.' : 'entry girdi.';
          var topicText = item.user.slug === 'igrencespri' ? 'boş yapıyo.' : 'başlık açtı.';

          switch (item.action) {
            case 'login':
              el.append(self.renderLiItem('/biri/' + item.user.slug, moment(item.date).fromNow(), '"' + item.user.username + '" giriş yaptı.'));
              break;
            case 'logout':
              el.append(self.renderLiItem('/biri/' + item.user.slug, moment(item.date).fromNow(), '"' + item.user.username + '" çıkış yaptı.'));
              break;
            case 'register':
              el.append(self.renderLiItem('/biri/' + item.user.slug, moment(item.date).fromNow(), '"' + item.user.username + '" kayıt oldu.'));
              break;
            case 'create_entry':
              el.append(self.renderLiItemWithData('/biri/' + item.user.slug, moment(item.date).fromNow(), '"' + item.user.username + '"', '/entry/' + item.data.id, entryText));
              break;
            case 'create_topic':
              el.append(self.renderLiItemWithData('/biri/' + item.user.slug, moment(item.date).fromNow(), '"' + item.user.username + '"', '/' + item.data.slug + '--' + item.data.id, topicText));
              break;
          }
        });
      });
    }
  });
});
