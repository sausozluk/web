define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ErrorTemplate = require('template!../../templates/error');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    title: '',

    description: '',

    initialize: function () {
    },

    render: function (code, message) {
      analytic.mixpanel('error view');
      $(this.el).html(ErrorTemplate({code: code, message: message, gif: $('[name="error-gif"]').attr('content')}));
      this.title = code;
      this.description = message;

      setTimeout(function () {
        window.router.navigate('/', true);
      }, 3000);
    }
  });
});
