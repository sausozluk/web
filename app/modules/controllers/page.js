define(function (require, exports, module) {
  var RegisterView = require('../views/register');
  var ErrorView = require('../views/error');
  var HomeView = require('../views/home');
  var TopicView = require('../views/topic');
  var LoginView = require('../views/login');
  var LogoutView = require('../views/logout');
  var TodayView = require('../views/today');
  var ProfileView = require('../views/profile');
  var SettingsView = require('../views/settings');
  var InboxView = require('../views/inbox');

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
    'topic': function () {
      return new TopicView();
    },
    'login': function () {
      return new LoginView();
    },
    'logout': function () {
      return new LogoutView();
    },
    'today': function () {
      return new TodayView();
    },
    'profile': function () {
      return new ProfileView();
    },
    'settings': function () {
      return new SettingsView();
    },
    'inbox': function () {
      return new InboxView();
    }
  };
});
