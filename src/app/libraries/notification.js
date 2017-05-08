define(function (require, exports, module) {
  var alertify = require('alertify');

  alertify.logPosition('bottom right');

  module.exports = {
    info: function (message, callback) {
      alertify.success.apply(this, arguments);
    },
    error: function (message, callback) {
      alertify.error.apply(this, arguments);
    }
  };
});