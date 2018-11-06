define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var DefineNewPassword = require('template!../../templates/define-new-password');
  var userController = require('../controllers/user');
  var notification = require('notification');
  

  module.exports = Backbone.View.extend({
    title: 'yeni şifre tanımla',

    description: 'sıkıntı yok halledicez',

    events: {
      'click #ok': 'doOk'
    },

    doOk: function (e) {
      e.preventDefault();

      var new_password_a = $('#new_password_a').val();
      var new_password_b = $('#new_password_b').val();

      if (new_password_a !== new_password_b) {
        notification.error('şifreler uygunsuz :p');
        return;
      }

      userController.defineNewPassword(this.token, {
        new_password_a: new_password_a,
        new_password_b: new_password_b
      }, function () {
        notification.info('oldu da bitti');
        window.router.navigate('/', true);
      });
    },

    render: function (token) {
      this.token = token;

      $(this.el).html(DefineNewPassword({}));
    }
  });
});
