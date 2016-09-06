define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LogoutTemplate = require('template!../../templates/logout');
  var app = require('app');
  var cache = require('cache');
  var UserController = require('../controllers/user');
  require('jquery.cookie');

  module.exports = Backbone.View.extend({
    events: {
    },

    doLogout: function () {
      cache.trigger('auth-false');
      app.router.navigate('/', true);
    },

    render: function () {
      $(this.el).html(LogoutTemplate({}));
      UserController.logout({}, function () {
        $.removeCookie('token');

        cache.trigger('auth-false');
        app.router.navigate('/login', true);
      });
    }
  });
});
