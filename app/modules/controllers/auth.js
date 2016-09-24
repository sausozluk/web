define(function (require, exports, module) {
  var UserController = require('./user');
  var app = require('app');
  var cache = require('cache');

  var login = function () {
    cache.trigger('auth-true');
    app.socket.start();
  };

  var logout = function () {
    cache.trigger('auth-false');
    app.socket.stop();
  };

  module.exports = {
    isNotSecure: function (route, args, next) {
      UserController['check-token']({}, function (message) {
        if (message) {
          login();
          app.router.navigate('/', true);
        } else {
          logout();
          next();
        }
      });
    },
    isSecure: function (route, args, next) {
      UserController['check-token']({}, function (message) {
        if (message) {
          login();
          next();
        } else {
          logout();
          cache.lastTry = location.pathname;
          app.router.navigate('/giris', true);
        }
      });
    },
    isVoid: function (route, args, next) {
      UserController['check-token']({}, function (message) {
        if (message) {
          login();
        } else {
          logout();
        }

        next();
      });
    }
  };
});
