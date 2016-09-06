define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ContentTemplate = require('template!../../../templates/globals/content');

  module.exports = Backbone.View.extend({
    events: {},

    tagName: 'div',
    className: 'content',
    id: 'app',

    initialize: function () {
    },

    render: function () {
      $(this.el).html(ContentTemplate());
    }
  });
});
