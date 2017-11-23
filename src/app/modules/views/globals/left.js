define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LeftFrameComponent = require('../components/left-frame');
  require('perfect-scrollbar');

  module.exports = Backbone.View.extend({
    events: {},

    tagName: 'div',
    className: 'left robots-nocontent',

    initialize: function () {
      this.leftFrameComponent = new LeftFrameComponent();
      this.leftFrameComponent.render();
    },

    reload: function () {
      this.leftFrameComponent.render();
    },

    render: function () {
      $(this.el).html(this.leftFrameComponent.el);
      $(this.el).perfectScrollbar();
    }
  });
});
