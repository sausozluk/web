define(function (require, exports, module) {
  var UserController = require('./user');
  var cache = require('cache');
  var eventBus = require('eventbus');
  var storage = require('storage');

  var login = function () {
    eventBus.emit('auth-true');
    window.socket.start();
  };

  var logout = function () {
    eventBus.emit('auth-false');
    storage.clean();
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
    'isMod': function (req, next) {
      if (storage.permission > 0) {
        next();
      } else {
        window.router.navigate('/', {trigger: true, replace: true});
      }
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
