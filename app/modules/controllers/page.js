define(function (require, exports, module) {
  var RegisterView = require('../views/register');
  var ErrorView = require('../views/error');
  var HomeView = require('../views/home');
  var LoginView = require('../views/login');
  var LogoutView = require('../views/logout');

  module.exports = {
    'register': function () {
      return new RegisterView();
    },
    'error': function () {
      return new ErrorView();
    },
    'home': function () {
      return new HomeView();
    },
    'login': function () {
      return new LoginView();
    },
    'logout': function () {
      return new LogoutView();
    }
  };
});
