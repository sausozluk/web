define(function (require, exports, module) {
  var cache = require('cache');
  var Favico = require('favicon');
  var storage = require('storage');
  var counterScript = require('text!libraries/workers/counter.js');

  var counter = new Worker(window.URL.createObjectURL(new Blob([counterScript], {type: 'text/javascript'})));
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

  module.exports = {
    startCounter: function () {
      counter.postMessage({
        action: 'start',
        data: runWith
      });
    }
  };
});
