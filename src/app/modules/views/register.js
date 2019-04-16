define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var RegisterTemplate = require('template!../../templates/register');
  var utils = require('utils');
  var userController = require('../controllers/user');
  var notification = require('notification');
  var analytic = require('analytic');

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
      analytic.mixpanel('register view');
      $(this.el).html(RegisterTemplate({}));
    }
  });
});
