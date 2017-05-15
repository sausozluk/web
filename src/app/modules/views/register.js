define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var RegisterTemplate = require('template!../../templates/register');
  var app = require('app');
  var cache = require('cache');
  var utils = require('utils');
  var storage = require('storage');
  var userController = require('../controllers/user');
  var notification = require('notification');
  var eventBus = require('eventbus');

  module.exports = Backbone.View.extend({
    title: 'kaydol',

    description: 'hadi yine iyiyiz',

    events: {
      'click #ok': 'doRegister'
    },

    doRegister: function (e) {
      e.preventDefault();

      var length = $('#username').val().trim().length;

      if (length > 40) {
        notification.error('bizde 40 karakter kısıtlaması var salih abi :(');
        return;
      }

      userController.register({
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val()
      }, function (data) {
        storage.id = data['user_id'];
        storage.token = data['user_id'];
        storage.permission = data['authority'];
        storage.username = data['username'];
        storage.slug = data['slug'];

        eventBus.emit('auth-true');
        notification.info('gel gel sen de gel');
        window.router.navigate('/', true);
      });
    },

    render: function () {
      $(this.el).html(RegisterTemplate({}));
    }
  });
});
