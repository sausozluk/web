define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LogoutTemplate = require('template!../../templates/logout');
  var app = require('app');
  var cache = require('cache');

  module.exports = Backbone.View.extend({
    events: {
    },

    doLogout: function () {
      cache.trigger('auth-false');
      app.router.navigate('/', true);
    },

    render: function () {
      $(this.el).html(LogoutTemplate({}));
      setTimeout((function () {
        this.doLogout();
      }).bind(this), 500);
    }
  });
});
