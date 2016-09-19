define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TabTemplate = require('template!../../../templates/components/settings-tab');

  module.exports = Backbone.View.extend({
    template: TabTemplate,

    events: {
      'click .tabs-menu span': 'handleClickTab'
    },

    tagName: 'div',
    className: 'tabs-container',

    initialize: function () {
    },

    handleClickTab: function (e) {
      e.preventDefault();

      var target = $(e.target);
      var parent = target.parent();
      parent.addClass('current');
      parent.siblings().removeClass('current');
      var tab = target.data('id');
      $('.tab-content').not(tab).css('display', 'none');
      $(tab).show();
    },

    render: function () {
      $(this.el).html(this.template());
    }
  });
});
