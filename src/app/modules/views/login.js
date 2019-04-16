define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LoginTemplate = require('template!../../templates/login');
  var cache = require('cache');
  var storage = require('storage');
  var userController = require('../controllers/user');
  var notification = require('notification');
  var eventBus = require('eventbus');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    title: 'giriş',

    description: 'all man must login',

    events: {
      'click #ok': 'doLoginWithClick',
      'keyup #email': 'doLoginWithEnter',
      'keyup #password': 'doLoginWithEnter'
    },

    doLoginWithClick: function (e) {
      e.preventDefault();

      this.doLogin();
    },

    doLoginWithEnter: function (e) {
      e.preventDefault();

      if (e.keyCode === 13) {
        this.doLogin();
      }
    },

    doLogin: function () {
      userController.doLogin({
        email: $('#email').val(),
        password: $('#password').val()
      }, function (data) {
        mixpanel.identify(data['username']);
        mixpanel.people.set({
            '$id':data['user_id'],
            '$name':data['username'],
            '$email': $('#email').val(),
            '$last_login': new Date(),
            'entry_count': data['entry_count']
        });
              /* Place this on a template where a customer initially is identified
           or after authentication. (Important: Update these values) */

        woopra.identify({
          name: data["username"]
        });

        // The identify code should be added before the "track()" function
        woopra.track();
        
        storage.id = data['user_id'];
        storage.token = data['token'];
        storage.permission = data['authority'];
        storage.username = data['username'];
        storage.slug = data['slug'];

        eventBus.emit('auth-true');
        eventBus.emit('unread', data['unread']);

        notification.info('yaaa şapşik ♥');

        if (!!cache.lastTry) {
          var target = cache.lastTry;
          delete cache.lastTry;
          window.router.navigate(target, true);
        } else {
          window.router.navigate('/', true);
        }
      });
    },

    render: function () {
      analytic.mixpanel('login view');
      $(this.el).html(LoginTemplate({}));
    }
  });
});
