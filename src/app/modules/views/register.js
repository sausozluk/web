define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var RegisterTemplate = require('template!../../templates/register');
  var app = require('app');
  var cache = require('cache');
  var utils = require('utils');
  var storage = require('storage');
  var userController = require('../controllers/user');
  var notification = require('notification');

  module.exports = Backbone.View.extend({
    title: 'kaydol',

    description: 'hadi yine iyiyiz',

    events: {
      'click #ok': 'doRegister'
    },

    doRegister: function (e) {
      e.preventDefault();

      var username = $('#username').val();
      var length = username.trim().length;

      if (length > 40 || !utils.title(username)) {
        notification.error('kullanıcı adı uygunsuz :p');
        return;
      }

      userController.register({
        email: $('#email').val(),
        username: username,
        password: $('#password').val()
      }, function (data) {
        notification.info('git bak bakim ben mailde miyim');
        window.router.navigate('/', true);
      });
    },

    render: function () {
      mixpanel.track("register view");
      $(this.el).html(RegisterTemplate({}));
    }
  });
});
