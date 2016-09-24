define(function (require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');
  var socket = require('libraries/socket');

  var cache = {};

  _.extend(cache, Backbone.Events);

  cache.on('send-message', function (obj) {
    socket.send(obj);
  });

  cache.on('catch-message', function () {

  });

  cache.on('auth-true', function () {
    if (!!cache.appView) {
      cache.appView.headerView.renderWithAuth(true);
      socket.listen(function (data) {
        cache.trigger('catch-message', data);
      });
    }
  });

  cache.on('auth-false', function () {
    if (!!cache.appView) {
      cache.appView.headerView.render();
    }
  });

  cache.on('reload-left', function () {
    if (!!cache.appView) {
      if (!!cache.appView.activeView && !!cache.appView.activeView.reload) {
        cache.appView.activeView.reload();
      }

      cache.appView.leftView.reload();
    }
  });

  module.exports = cache;
});
