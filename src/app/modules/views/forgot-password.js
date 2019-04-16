define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ForgotPasswordTemplate = require('template!../../templates/forgot-password');
  var userController = require('../controllers/user');
  var notification = require('notification');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    title: 'şifre sıfırlama süreci',

    description: 'bu hayatta unutulan değil, iz bırakan ol',

    events: {
      'click #ok': 'doOk'
    },

    doOk: function (e) {
      e.preventDefault();

      var email = $('#email').val();

      userController.forgotPassword({
        email: email
      }, function (data) {
        notification.info('süreç mail\'de devam ediyor, bi git bak');
        window.router.navigate('/', true);
      });
    },

    render: function () {
      analytic.mixpanel('reset password view');
      $(this.el).html(ForgotPasswordTemplate({}));
    }
  });
});
