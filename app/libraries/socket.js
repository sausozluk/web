define(function (require, exports, module) {
  var boss = require('boss');
  var storage = require('storage');
  var utils = require('utils');
  var isRunning = false;
  var socket = null;

  var handler = function (res) {
    if (res.action === 'send_message') {
      var data = res.data;
      utils.doNoty('success', data.message);
    }
  };

  var start = function () {
    socket = boss.startSocket(storage.token, function (data) {
      if (data === true) {
        isRunning = true;
      } else if (data === false) {
        isRunning = false;
      } else {
        handler(data);
      }
    });
  };

  module.exports = {
    start: function () {
      if (!isRunning && storage.token) {
        start();
      }
    },
    stop: function () {
      if (socket) {
        socket.send(false);
      }
    },
    send: function (data) {
      if (socket && isRunning) {
        socket.send(data);
      }
    },
    get status() {
      return isRunning;
    }
  };
});