define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var AdminTemplate = require('template!../../templates/admin');
  var notification = require('notification');
  var homeController = require('../controllers/home');

  module.exports = Backbone.View.extend({
    tagName: 'div',

    title: 'god mode',

    description: 'patron',

    template: AdminTemplate,

    initialize: function () {
    },

    events: {
      'click .force-global-logout': 'handleForceGlobalLogout'
    },

    handleForceGlobalLogout: function (e) {
      e.preventDefault();

      notification.confirm('tüm hesaplar çıkışa zorlanacak? emin misin ???', (function () {
        this.forceGlobalLogout();
      }).bind(this));
    },

    forceGlobalLogout: function () {
      homeController.forceGlobalLogout(function () {
        notification.info('büyük cesaret afferim');
        window.router.navigate('/', true);
      });
    },

    render: function () {
      mixpanel.track('admin view');
      $(this.el).html(this.template());
      return this;
    }
  });
});
