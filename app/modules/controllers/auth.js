define(function (require, exports, module) {
  var UserController = require('./user');
  var app = require('app');
  var cache = require('cache');

  module.exports = {
    isNotSecure: function (route, args, next) {
      UserController['check-token']({}, function (message) {
        if (message) {
          cache.trigger('auth-true');
          app.router.navigate('/', true);
        } else {
          cache.trigger('auth-false');
          next();
        }
      });
    },
    isSecure: function (route, args, next) {
      UserController['check-token']({}, function (message) {
        if (message) {
          cache.trigger('auth-true');
          next();
        } else {
          cache.trigger('auth-false');
          cache.lastTry = location.pathname;
          app.router.navigate('/giris', true);
        }
      });
    },
    isVoid: function (route, args, next) {
      UserController['check-token']({}, function (message) {
        if (message) {
          cache.trigger('auth-true');
        } else {
          cache.trigger('auth-false');
        }

        next();
      });
    }
  };
});
