define(function (require, exports, module) {
  var utils = require('utils');
  var cache = require('cache');
  var boss = require('boss');
  var socket = require('libraries/socket');
  var AppView = require('modules/views/globals/app');
  var appView = new AppView();

  boss.startCounter();

  utils.historyTrick();
  utils.tokenSync();
  utils.defineGlobalErrorHandler();
  appView.render();

  cache.appView = appView;

  module.exports = {
    root: module.config().root,
    socket: socket
  };
});
