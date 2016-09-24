define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var InboxTemplate = require('template!../../templates/inbox');
  var cache = require('cache');
  var app = require('app');

  module.exports = Backbone.View.extend({
    title: 'mesaj',

    description: 'instant yürüme sistemi',

    events: {
      'click #ok': 'handleClickOk'
    },

    handleClickOk: function (e) {
      e.preventDefault();
      var message = $('#message').val().trim();
      app.socket.send({
        to: 'ov',
        message: message
      });
    },

    render: function () {
      $(this.el).html(InboxTemplate());
    }
  });
});
