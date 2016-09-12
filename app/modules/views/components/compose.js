define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ComposeTemplate = require('template!../../../templates/components/compose');
  var utils = require('utils');

  module.exports = Backbone.View.extend({
    template: ComposeTemplate,

    events: {
      'click #bkz': 'handleBkz',
      'click #yildiz': 'handleYildiz',
      'click #link': 'handleLink',
      'click #ok': 'handleOk'
    },

    tagName: 'div',
    className: 'compose',

    initialize: function (options) {
      this.topic = options.id || -1;
    },

    handleBkz: function (e) {
      e.preventDefault();

      prompt('hangi başlığa bkz verilecek?');
    },

    handleYildiz: function (e) {
      e.preventDefault();

      prompt('yıldız içinde ne görünecek?');
    },

    handleLink: function (e) {
      e.preventDefault();

      prompt('hangi adrese gidecek?');
    },

    handleOk: function (e) {
      e.preventDefault();

      utils.doNoty('success', 'vayyy, okuyo musunuz kaça gidiyosunuz?');
    },

    render: function () {
      $(this.el).html(this.template());
      return this;
    }
  });
});
