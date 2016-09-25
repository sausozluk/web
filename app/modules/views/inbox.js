define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var InboxTemplate = require('template!../../templates/inbox');
  var cache = require('cache');
  var app = require('app');
  var socket = require('libraries/socket');
  var utils = require('utils');

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
      if (socket.status) {
        $(this.el).html(InboxTemplate());
      } else {
        utils.doNoty('error', 'mesajlaşma servisi çıktı, not alıyım istersen?');
        app.router.navigate('/', true);
      }
    }
  });
});
