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
        action: 'send_message',
        data: {
          to: 'ov',
          message: message
        }
      });
    },

    render: function () {
      $(this.el).html(InboxTemplate());
      utils.doNoty('success', 'bağlanıyor ...');

      setTimeout(function () {
        if (!socket.status) {
          utils.doNoty('error', 'mesajlaşma servisi çıktı, not alıyım istersen?');
        } else {
          $('#message').prop('disabled', false);
          $('#ok').prop('disabled', false);
          utils.doNoty('success', 'bağlandı :)');
        }
      }, 3000);
    }
  });
});
