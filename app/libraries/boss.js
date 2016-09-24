define(function (require, exports, module) {
  var cache = require('cache');
  var Favico = require('favicon');
  var storage = require('storage');
  var utils = require('utils');
  var counterScript = require('text!libraries/workers/counter.js');
  var socketScript = require('text!libraries/workers/socket.js');

  var socketHandler = null;

  var counter = new Worker(window.URL.createObjectURL(
    new Blob([counterScript], {type: 'text/javascript'})
  ));

  var socket = new Worker(window.URL.createObjectURL(
    new Blob([socketScript], {type: 'text/javascript'})
  ));

  var icon = new Favico({
    bgColor: '#5CB85C', textColor: '#ff0', position: 'up'
  });

  var updateIcon = function (n) {
    icon.badge(n);
    storage.badge = n;
  };

  var runWith = storage.badge || 0;
  updateIcon(runWith);

  counter.onmessage = function (e) {
    updateIcon(parseInt(e.data));
    cache.trigger('reload-left');
  };

  socket.onmessage = function (e) {
    var obj = e.data;
    (socketHandler ? socketHandler : function () {
    })(obj);
  };

  module.exports = {
    startCounter: function () {
      counter.postMessage({
        action: 'start',
        data: runWith
      });
    },
    startSocket: function (token, callback) {
      socketHandler = callback;
      socket.postMessage({
        action: 'start',
        data: {
          url: utils.ws_uri,
          token: token
        }
      });

      return {
        send: function (data) {
          if (!data) {
            socket.postMessage({
              action: 'close'
            });
          } else {
            socket.postMessage({
              action: 'message',
              data: data
            });
          }
        }
      };
    }
  };
});
