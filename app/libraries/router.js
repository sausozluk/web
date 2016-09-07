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
      ':url--:id(/)': {
        m: auth.isVoid,
        f: 'topic'
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

    default: function () {
      cache.appView.renderPage(PageController.error(), ['404', 'NOT FOUND']);
    }
  });
});
