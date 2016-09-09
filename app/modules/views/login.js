define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LoginTemplate = require('template!../../templates/login');
  var app = require('app');
  var cache = require('cache');
  var utils = require('utils');
  var userController = require('../controllers/user');
  require('jquery.cookie');

  module.exports = Backbone.View.extend({
    events: {
      'click #ok': 'doLogin'
    },

    doLogin: function (e) {
      e.preventDefault();

      userController.doLogin({
        email: $('#email').val(),
        password: $('#password').val()
      }, function (data) {
        $.cookie('token', data.token);
        cache.trigger('auth-true');
        utils.doNoty('success', 'yaaa şapşik ♥');
        if (!!cache.lastTry) {
          var target = cache.lastTry;
          delete cache.lastTry;
          app.router.navigate(target, true);
        } else {
          app.router.navigate('/', true);
        }
      });
    },

    render: function () {
      $(this.el).html(LoginTemplate({}));
    }
  });
});
