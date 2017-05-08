define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ErrorTemplate = require('template!../../templates/error');

  module.exports = Backbone.View.extend({
    title: '',

    description: '',

    initialize: function () {
    },

    render: function (code, message) {
      $(this.el).html(ErrorTemplate({code: code, message: message}));
      this.title = code;
      this.description = message;
    }
  });
});
