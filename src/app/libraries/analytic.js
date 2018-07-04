define(function (require, exports, module) {
  module.exports = {
    mixpanel: function (message) {
      if (typeof window.mixpanel !== 'undefined') {
        mixpanel.track(message);
      }
    }
  };
});