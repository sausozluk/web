define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LeftFrameComponent = require('./components/left-frame');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    title: 'bugün',

    description: '"bugün" neler olmuş öyle?',

    events: {
    },

    initialize: function () {
      this.leftFrameComponent = new LeftFrameComponent();
      this.leftFrameComponent.render();
    },

    reload: function () {
      this.leftFrameComponent.render();
    },

    render: function () {
      analytic.mixpanel('today topics view');
      $(this.el).html(this.leftFrameComponent.el);
      $('.content').addClass('today');
    }
  });
});
