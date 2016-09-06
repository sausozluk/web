define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LeftTemplate = require('template!../../../templates/globals/left');

  module.exports = Backbone.View.extend({
    events: {},

    tagName: 'div',
    className: 'left',

    initialize: function () {
    },

    render: function () {
      $(this.el).html(LeftTemplate());
    }
  });
});
