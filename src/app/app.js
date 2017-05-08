define(function (require, exports, module) {
  var AppView = require('modules/views/globals/app');
  var appView = new AppView();

  appView.render();

  window.appView = appView;

  module.exports = {
    root: module.config().root
  };
});
