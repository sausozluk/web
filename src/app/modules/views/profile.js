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
  var utils = require('utils');
  var eventBus = require('eventbus');

  module.exports = Backbone.View.extend({
    events: {
      'click .user-do-ban': 'doBan',
      'click .user-do-mod': 'doMod',
      'click .user-do-login': 'doLogin',
      'keyup .notes': 'handleNotesChange'
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

    doLogin: function (e) {
      e.preventDefault();

      notification.confirm('eminsin?', (function () {
        userController.loginWithSlug(this.slug, (function (resp) {
          this.continueToLogin(resp.data);
          notification.info('gene ne yaptı hergele');
        }).bind(this));
      }).bind(this));
    },

    continueToLogin: function (data) {
      userController.logout({}, function () {
        storage.clean();
        eventBus.emit('auth-false');

        storage.id = data['user_id'];
        storage.token = data['token'];
        storage.permission = data['authority'];
        storage.username = data['username'];
        storage.slug = data['slug'];

        eventBus.emit('auth-true');
        eventBus.emit('unread', data['unread']);

        window.router.navigate('/', true);
      });
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

    handleNotesChange: function (e) {
      e.preventDefault();

      var self = this;
      var val = $(e.currentTarget).val();

      utils.delay(function () {
        self.saveNote(val);
      }, 1000);
    },

    saveNote: function (note) {
      userController.noteWithSlug(this.slug, note, function () {
        notification.info('yazdık bunu bi kenara');
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
        profile.note = profile.note || '';
        profile.email = profile.email || 'u_have_no_access@faggot.idiot';
        this.setTitleAndDescription(profile.username);
        $(this.el).html(ProfileTemplate(profile));

        if (profile.isAdmin) {
          this.renderSessions();
        }
      }).bind(this));
    }
  });
});
