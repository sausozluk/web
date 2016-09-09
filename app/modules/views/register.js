define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var RegisterTemplate = require('template!../../templates/register');
  var app = require('app');
  var cache = require('cache');
  var utils = require('utils');
  var userController = require('../controllers/user');
  require('jquery.cookie');

  module.exports = Backbone.View.extend({
    events: {
      'click #ok': 'doRegister'
    },

    doRegister: function (e) {
      e.preventDefault();

      userController.register({
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val()
      }, function (data) {
        $.cookie('token', data.token);
        cache.trigger('auth-true');
        utils.doNoty('success', 'gel gel sen de gel');
        app.router.navigate('/', true);
      });
    },

    render: function () {
      $(this.el).html(RegisterTemplate({}));
    }
  });
});
