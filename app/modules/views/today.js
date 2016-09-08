define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LeftTemplate = require('template!../../templates/globals/left');

  module.exports = Backbone.View.extend({
    events: {
    },

    render: function () {
      $(this.el).html(LeftTemplate({}));
      $('.content').addClass('today');
    }
  });
});
