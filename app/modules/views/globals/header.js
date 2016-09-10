define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var HeaderTemplate = require('template!../../../templates/globals/header');

  module.exports = Backbone.View.extend({
    events: {},

    initialize: function () {
    },

    render: function () {
      $(this.el).html(HeaderTemplate({auth: false}));
    },

    renderWithAuth: function (auth) {
      $(this.el).html(HeaderTemplate({auth: auth}));
    }
  });
});
