define(function (require, exports, module) {
  var boss = require('boss');
  var storage = require('storage');
  var isRunning = false;
  var socket = null;

  var start = function (next) {
    socket = boss.startSocket(storage.token, function (data) {
      if (data === true) {
        isRunning = true;
      } else if (data === false) {
        isRunning = false;
      } else {
        next(data);
      }
    });
  };

  module.exports = {
    listen: function (next) {
      if (!isRunning) {
        start(next);
      }
    },
    send: function (data) {
      if (socket) {
        socket.send(data);
      }
    },
    get status() {
      return isRunning;
    }
  };
});