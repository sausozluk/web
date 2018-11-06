define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ActivateTemplate = require('template!../../templates/activate-mail');
  var UserController = require('../controllers/user');
  var notification = require('notification');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    title: 'yeni posta kutusu şapılıyooo',

    description: 'değerli',

    events: {},

    render: function (token) {
      $(this.el).html(ActivateTemplate({}));
      UserController.activateMail(token, function () {
        notification.info('hayırlı olsun ehehe');
        window.router.navigate('/', true);
      });
    }
  });
});
