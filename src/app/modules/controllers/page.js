define(function (require, exports, module) {
  var RegisterView = require('../views/register');
  var ForgotPasswordView = require('../views/forgot-password');
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
  var VotesView = require('../views/votes');
  var ActivateView = require('../views/activate');
  var ActivateMailView = require('../views/activate-mail');
  var EntryEditView = require('../views/entry-edit');
  var DeveloperView = require('../views/developer');
  var StatsView = require('../views/stats');
  var ActivitiesView = require('../views/activities');
  var ModView = require('../views/mod');
  var AdminView = require('../views/admin');
  var OnlineView = require('../views/online');
  var PrivacyView = require('../views/privacy');
  var DefineNewPasswordView = require('../views/define-new-password');

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
    'privacy': function (req) {
      renderPage(new PrivacyView());
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
    'votes': function (req) {
      renderPage(new VotesView(), req.params);
    },
    'activate': function (req) {
      renderPage(new ActivateView(), req.params);
    },
    'defineNewPassword': function (req) {
      renderPage(new DefineNewPasswordView(), req.params);
    },
    'activateMail': function (req) {
      renderPage(new ActivateMailView(), req.params);
    },
    'q': function (req) {
      renderPage(new QView(), req.params);
    },
    'entryEdit': function (req) {
      renderPage(new EntryEditView(), req.params);
    },
    'developer': function (req) {
      renderPage(new DeveloperView());
    },
    'stats': function (req) {
      renderPage(new StatsView());
    },
    'activities': function (req) {
      renderPage(new ActivitiesView());
    },
    'mod': function (req) {
      renderPage(new ModView());
    },
    'admin': function (req) {
      renderPage(new AdminView());
    },
    'online': function (req) {
      renderPage(new OnlineView());
    },
    'forgotPassword': function (req) {
      renderPage(new ForgotPasswordView());
    }
  };
});
