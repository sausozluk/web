define(function (require, exports, module) {
  var Favico = require('favicon');
  var counterScript = require('text!libraries/workers/counter.js');

  var counter = new Worker(URL.createObjectURL(new Blob([counterScript], {type: 'text/javascript'})));
  var icon = new Favico({
    bgColor: '#5CB85C', textColor: '#ff0', position: 'up'
  });

  counter.onmessage = function (e) {
    icon.badge(parseInt(e.data));
  };

  module.exports = {
    startCounter: function () {
      counter.postMessage('start');
    }
  };
});
