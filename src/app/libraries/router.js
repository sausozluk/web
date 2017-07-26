define(function (require, exports, module) {
  var Backbone = require('backbone');
  var _ = require('underscore');
  var utils = require('utils');
  var page = require('../modules/controllers/page');
  var auth = require('../modules/controllers/auth');

  var base = Backbone.Router.prototype.route;

  _.extend(Backbone.Router.prototype, {
    route: function (route, name, callback) {
      var callbacks = this.use ? this.use : [];
      if (_.isFunction(name)) {
        callbacks = callbacks.concat(name);
        name = '';
      }

      return base.call(
        this,
        route,
        name,
        _.bind(function () {
          var req = {
            params: _
              .values(arguments)
              .filter(function (i) {
                return i;
              })
          };

          if (_.isString(name)) {
            callbacks = callbacks.concat(this[name]);
          }

          (function waterfall(i) {
            if (callbacks.length &&
              callbacks[i]) {
              return function () {
                callbacks[i]
                  .bind(this)(
                    req,
                    waterfall(i + 1).bind(this)
                  );
              };
            } else {
              return function () {
              };
            }
          })(0).bind(this)(req);
        }, this));
    }
  });

  module.exports = Backbone.Router.extend({
    routes: {
      '(/)': 'home',
      'kayit(/)': 'register',
      'giris(/)': 'login',
      'cikis(/)': 'logout',
      'bugun(/)': 'today',
      'ayarlar(/)': 'settings',
      'mesaj(/)': 'inbox',
      'mesaj/:nick(/)': 'chat',
      ':url--:id(/)': 'topic',
      ':url--:id(/):page(/)': 'topicWithPage',
      'biri/:nick(/)': 'profile',
      'olan-biten(/)': 'developer',
      'entry/:id(/)oylar(/)': 'votes',
      'entry/:id(/)': 'entry',
      'aktivasyon/:token(/)': 'activate',
      'yeni-mail/:token(/)': 'activateMail',
      'q/:text(/)': 'q',
      'ara(/)': 'search',
      'entry/duzelt/:id(/)': 'entryEdit',
      '*path': 'default'
    },

    use: [utils.metaSuccess, utils.pageEventCleaner(window.appView), utils.colorize(), utils.cleanPageMeta],

    home: [auth.isVoid, page.home],
    register: [auth.isNotSecure, page.register],
    login: [auth.isNotSecure, page.login],
    logout: [auth.isSecure, page.logout],
    topic: [auth.isVoid, page.topic],
    topicWithPage: [auth.isVoid, page.topic],
    entry: [auth.isVoid, page.entry],
    votes: [auth.isVoid, page.votes],
    activate: [auth.isVoid, page.activate],
    activateMail: [auth.isVoid, page.activateMail],
    entryEdit: [auth.isSecure, page.entryEdit],
    profile: [auth.isVoid, page.profile],
    developer: [auth.isSecure, page.developer],
    today: [auth.isVoid, page.today],
    settings: [auth.isSecure, page.settings],
    inbox: [auth.isSecure, page.inbox],
    chat: [auth.isSecure, page.chat],
    q: [auth.isVoid, page.q],
    search: [auth.isVoid, page.search],
    default: [auth.isVoid, page.error]
  });
});
