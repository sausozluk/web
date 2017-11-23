define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ProfileTemplate = require('template!../../templates/profile');
  var SessionItemTemplate = require('template!../../templates/components/session-item');
  var userController = require('../controllers/user');
  var sessionController = require('../controllers/session');
  var storage = require('storage');
  var notification = require('notification');
  var moment = require('moment');
  var _ = require('lodash');

  module.exports = Backbone.View.extend({
    events: {
      'click .user-do-ban': 'doBan',
      'click .user-do-mod': 'doMod'
    },

    setTitleAndDescription: function (text) {
      document.title = text + ' - saü sözlük';
      $('[name="description"]').attr('content', ('"' + text + '" nickli kullanıcı işte'));
      $('[name="twitter:title"]').attr('content', text);
      $('[name="twitter:description"]').attr('content', ('"' + text + '" nickli kullanıcı işte'));
    },

    doBan: function (e) {
      e.preventDefault();

      notification.confirm('eminsin?', (function () {
        userController.banWithSlug(this.slug, (function () {
          notification.info('hehe gitti mal');
        }).bind(this));
      }).bind(this));
    },

    doMod: function (e) {
      e.preventDefault();

      notification.confirm('eminsin?', (function () {
        userController.modWithSlug(this.slug, (function () {
          notification.info('örtmen oldu');
        }).bind(this));
      }).bind(this));
    },

    renderSessions: function () {
      var el = $(this.el).find('.sessions');

      sessionController.getSessionsWithSlug(this.slug, function (result) {
        _.forEach(result, function (item) {
          item.m = moment;
          el.append(SessionItemTemplate(item));
        });
      });
    },

    render: function (nick) {
      this.slug = nick;
      userController.getProfileWithSlug(nick, (function (profile) {
        profile['last_activities'].sort(function (a, b) {
          var date_a = new Date(a.date);
          var date_b = new Date(b.date);

          return date_b.getTime() - date_a.getTime();
        });

        profile.isAdmin = storage.permission > 1 && storage.slug !== nick;
        profile.isMe = storage.slug === nick;
        profile.isLoggedIn = !!storage.token;
        profile.slug = this.slug;
        profile.m = moment;
        this.setTitleAndDescription(profile.username);
        $(this.el).html(ProfileTemplate(profile));

        if (profile.isAdmin) {
          this.renderSessions();
        }
      }).bind(this));
    }
  });
});
