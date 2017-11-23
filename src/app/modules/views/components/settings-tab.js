define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TabTemplate = require('template!../../../templates/components/settings-tab');
  var userController = require('../../controllers/user');
  var notification = require('notification');
  var eventBus = require('eventbus');
  var storage = require('storage');

  module.exports = Backbone.View.extend({
    template: TabTemplate,

    events: {
      'click .tabs-menu span': 'handleClickTab',
      'click #email-ok': 'handleClickEmailOk',
      'click #password-ok': 'handleClickPasswordOk',
      'click #exit-ok': 'handleClickExitOk'
    },

    tagName: 'div',
    className: 'tabs-container',

    initialize: function () {
    },

    handleClickExitOk: function (e) {
      e.preventDefault();

      notification.confirm('eminsin?', (function () {
        userController.exitWithSlug(storage.slug, (function () {
          storage.clean();
          eventBus.emit('auth-false');
          notification.info('oh rahatladık bi');
          window.router.navigate('/giris', true);
        }).bind(this));
      }).bind(this));
    },

    handleClickEmailOk: function (e) {
      e.preventDefault();

      var info = {
        old_email: $('#old_email').val(),
        password: $('#password').val(),
        new_email_a: $('#new_email_a').val(),
        new_email_b: $('#new_email_b').val()
      };

      userController.changeMail(info, function (data) {
        notification.info('yeni maile bi bakıver');
        window.router.navigate('/', true);
      });
    },

    handleClickPasswordOk: function (e) {
      e.preventDefault();

      var info = {
        old_password: $('#old_password').val(),
        new_password_a: $('#new_password_a').val(),
        new_password_b: $('#new_password_b').val()
      };

      userController.changePassword(info, function (data) {
        notification.info('oldu da bitti');
        window.router.navigate('/', true);
      });
    },

    handleClickTab: function (e) {
      e.preventDefault();

      var target = $(e.target);
      var parent = target.parent();
      parent.addClass('current');
      parent.siblings().removeClass('current');
      var tab = target.data('id');
      $('.tab-content').not(tab).css('display', 'none');
      $(tab).show();
    },

    render: function () {
      $(this.el).html(this.template());
    }
  });
});
