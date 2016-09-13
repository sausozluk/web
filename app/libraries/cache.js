define(function (require, exports, module) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var cache = {};

  _.extend(cache, Backbone.Events);

  cache.on('auth-true', function () {
    if (cache.appView !== 'undefined') {
      cache.appView.headerView.renderWithAuth(true);
    }
  });

  cache.on('auth-false', function () {
    if (cache.appView !== 'undefined') {
      cache.appView.headerView.render();
    }
  });

  cache.on('reload-left', function () {
    if (cache.appView !== 'undefined') {
      cache.appView.leftView.reload();
    }
  });

  module.exports = cache;
});
