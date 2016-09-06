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
        m: auth.isGuess,
        f: 'home'
      },
      'register(/)': {
        m: auth.isGuess,
        f: 'register'
      },
      'login(/)': {
        m: auth.isGuess,
        f: 'login'
      },
      'logout(/)': {
        m: auth.isGuess,
        f: 'logout'
      },
      '*path': {
        m: auth.isGuess,
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

    default: function () {
      cache.appView.renderPage(PageController.error(), ['404', 'NOT FOUND']);
    }
  });
});
