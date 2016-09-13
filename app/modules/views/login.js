define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LoginTemplate = require('template!../../templates/login');
  var app = require('app');
  var cache = require('cache');
  var utils = require('utils');
  var storage = require('storage');
  var userController = require('../controllers/user');

  module.exports = Backbone.View.extend({
    title: 'giriş',

    description: 'all man must login',

    events: {
      'click #ok': 'doLoginWithClick',
      'keyup #email': 'doLoginWithEnter',
      'keyup #password': 'doLoginWithEnter'
    },

    doLoginWithClick: function (e) {
      e.preventDefault();

      this.doLogin();
    },

    doLoginWithEnter: function (e) {
      e.preventDefault();

      if (e.keyCode === 13) {
        this.doLogin();
      }
    },

    doLogin: function () {
      userController.doLogin({
        email: $('#email').val(),
        password: $('#password').val()
      }, function (data) {
        storage.id = data.user_id;
        storage.token = data.token;
        storage.permission = data.authority;
        storage.email = data.email;
        storage.username = data.username;
        storage.slug = data.slug;
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
