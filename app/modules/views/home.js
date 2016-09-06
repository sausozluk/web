define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var HomeTemplate = require('template!../../templates/home');

  module.exports = Backbone.View.extend({
    events: {
    },

    render: function () {
      $(this.el).html(HomeTemplate({}));
    }
  });
});
