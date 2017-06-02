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
  var ChatView = require('../views/chat');
  var QView = require('../views/q');
  var EntryView = require('../views/entry');
  var ActivateView = require('../views/activate');
  var EntryEditView = require('../views/entry-edit');
  var SearchView = require('../views/search');
  var DeveloperView = require('../views/developer');

  var cache = require('cache');
  var appView = window.appView;
  var renderPage = appView.renderPage.bind(appView);

  module.exports = {
    'register': function (req) {
      renderPage(new RegisterView());
    },
    'error': function (req) {
      $('meta[name="prerender-status-code"]').attr('content', 404);
      renderPage(new ErrorView(), ['404', 'NOT FOUND']);
    },
    'home': function (req) {
      renderPage(new HomeView());
    },
    'topic': function (req) {
      renderPage(new TopicView(), req.params);
    },
    'login': function (req) {
      renderPage(new LoginView());
    },
    'logout': function (req) {
      renderPage(new LogoutView());
    },
    'today': function (req) {
      renderPage(new TodayView());
    },
    'profile': function (req) {
      renderPage(new ProfileView(), req.params);
    },
    'settings': function (req) {
      renderPage(new SettingsView());
    },
    'inbox': function (req) {
      renderPage(new InboxView());
    },
    'chat': function (req) {
      renderPage(new ChatView(), req.params);
    },
    'entry': function (req) {
      renderPage(new EntryView(), req.params);
    },
    'activate': function (req) {
      renderPage(new ActivateView(), req.params);
    },
    'q': function (req) {
      renderPage(new QView(), req.params);
    },
    'search': function (req) {
      renderPage(new SearchView());
    },
    'entryEdit': function (req) {
      renderPage(new EntryEditView(), req.params);
    },
    'developer': function (req) {
      renderPage(new DeveloperView());
    }
  };
});
