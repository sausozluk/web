define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LogoutTemplate = require('template!../../templates/logout');
  var app = require('app');
  var cache = require('cache');
  var utils = require('utils');
  var UserController = require('../controllers/user');
  require('jquery.cookie');

  module.exports = Backbone.View.extend({
    title: 'kalkan gemi',

    description: 'gidene elveda denen yer',

    events: {
    },

    render: function () {
      $(this.el).html(LogoutTemplate({}));
      UserController.logout({}, function () {
        $.removeCookie('token');

        cache.trigger('auth-false');
        utils.doNoty('success', 'sad but true :<');
        app.router.navigate('/login', true);
      });
    }
  });
});
