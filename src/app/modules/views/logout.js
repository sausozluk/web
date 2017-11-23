define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LogoutTemplate = require('template!../../templates/logout');
  var app = require('app');
  var cache = require('cache');
  var utils = require('utils');
  var storage = require('storage');
  var UserController = require('../controllers/user');
  var notification = require('notification');
  var eventBus = require('eventbus');

  module.exports = Backbone.View.extend({
    title: 'kalkan gemi',

    description: 'gidene elveda denen yer',

    events: {},

    render: function () {
      $(this.el).html(LogoutTemplate({}));
      UserController.logout({}, function () {
        storage.clean();
        eventBus.emit('auth-false');
        notification.info('sad but true :<');
        window.router.navigate('/giris', {trigger: true, replace: true});
      });
    }
  });
});
