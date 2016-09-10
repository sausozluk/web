define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var InboxTemplate = require('template!../../templates/inbox');

  module.exports = Backbone.View.extend({
    title: 'mesaj',

    description: 'instant yürüme sistemi',

    events: {},

    render: function () {
      $(this.el).html(InboxTemplate());
    }
  });
});
