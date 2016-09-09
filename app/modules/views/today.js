define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LeftFrameComponent = require('./components/left-frame');

  module.exports = Backbone.View.extend({
    events: {
    },

    initialize: function () {
      this.leftFrameComponent = new LeftFrameComponent();
      this.leftFrameComponent.render();
    },

    render: function () {
      $(this.el).html(this.leftFrameComponent.el);
      $('.content').addClass('today');
    }
  });
});
