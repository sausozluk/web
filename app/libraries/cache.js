define(function (require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var cache = {};

  _.extend(cache, Backbone.Events);

  cache.on('auth-true', function () {
    if (!!cache.appView) {
      cache.appView.headerView.renderWithAuth(true);
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
