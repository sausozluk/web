define(function (require, exports, module) {
  var UserController = require('./user');
  var cache = require('cache');
  var eventBus = require('eventbus');

  var login = function () {
    eventBus.emit('auth-true');
    window.socket.start();
  };

  var logout = function () {
    eventBus.emit('auth-false');
    window.socket.stop();
  };

  module.exports = {
    'isNotSecure': function (req, next) {
      UserController['check-token']({}, function (message) {
        if (message) {
          login();
          window.router.navigate('/', true);
        } else {
          logout();
          next();
        }
      });
    },
    'isSecure': function (req, next) {
      UserController['check-token']({}, function (message) {
        if (message) {
          login();
          next();
        } else {
          logout();
          cache.lastTry = location.pathname;
          window.router.navigate('/giris', true);
        }
      });
    },
    'isVoid': function (req, next) {
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
