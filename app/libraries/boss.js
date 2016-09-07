define(function (require, exports, module) {
  var counterScript = require('text!libraries/workers/counter.js');
  var counter = new Worker(URL.createObjectURL(new Blob([counterScript], {type: 'text/javascript'})));

  counter.onmessage = function (e) {
    console.log(e.data);
  };

  module.exports = {
    startCounter: function () {
      counter.postMessage('start');
    }
  };
});
