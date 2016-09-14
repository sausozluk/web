define(function (require, exports, module) {
  var Backbone = require('backbone');
  var _ = require('underscore');

  require('backbone.middleware');

  var utils = require('utils');
  var cache = require('cache');

  var PageController = require('../modules/controllers/page');
  var auth = require('../modules/controllers/auth');

  module.exports = Backbone.Router.extend({
    routes: {
      '(/)': {
        m: auth.isVoid,
        f: 'home'
      },
      'register(/)': {
        m: auth.isNotSecure,
        f: 'register'
      },
      'login(/)': {
        m: auth.isNotSecure,
        f: 'login'
      },
      'logout(/)': {
        m: auth.isSecure,
        f: 'logout'
      },
      'bugun(/)': {
        m: auth.isVoid,
        f: 'today'
      },
      'settings(/)': {
        m: auth.isSecure,
        f: 'settings'
      },
      'inbox(/)': {
        m: auth.isSecure,
        f: 'inbox'
      },
      ':url--:id(/)': {
        m: auth.isVoid,
        f: 'topic'
      },
      'biri/:nick(/)': {
        m: auth.isVoid,
        f: 'profile'
      },
      'entry/:id(/)': {
        m: auth.isVoid,
        f: 'entry'
      },
      'entry/duzelt/:id(/)': {
        m: auth.isSecure,
        f: 'entry-edit'
      },
      '*path': {
        m: auth.isVoid,
        f: 'default'
      }
    },

    use: [utils.pageEventCleaner(cache.appView)],

    home: function () {
      cache.appView.renderPage(PageController.home());
    },

    register: function () {
      cache.appView.renderPage(PageController.register());
    },

    login: function () {
      cache.appView.renderPage(PageController.login());
    },

    logout: function () {
      cache.appView.renderPage(PageController.logout());
    },

    topic: function (url, id) {
      cache.appView.renderPage(PageController.topic(), [url, id]);
    },

    entry: function (id) {
      cache.appView.renderPage(PageController.entry(), [id]);
    },

    'entry-edit': function (id) {
      cache.appView.renderPage(PageController['entry-edit'](), [id]);
    },

    profile: function (nick) {
      cache.appView.renderPage(PageController.profile(), [nick]);
    },

    today: function () {
      cache.appView.renderPage(PageController.today());
    },

    settings: function () {
      cache.appView.renderPage(PageController.settings());
    },

    inbox: function () {
      cache.appView.renderPage(PageController.inbox());
    },

    default: function () {
      cache.appView.renderPage(PageController.error(), ['404', 'NOT FOUND']);
    }
  });
});
