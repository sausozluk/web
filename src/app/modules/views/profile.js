define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ProfileTemplate = require('template!../../templates/profile');
  var userController = require('../controllers/user');
  var storage = require('storage');
  var notification = require('notification');

  module.exports = Backbone.View.extend({
    events: {
      'click .user-do-ban': 'doBan'
    },

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" nickli kullanıcı işte'));
    },

    doBan: function (e) {
      e.preventDefault();

      userController.banWithSlug(this.slug, (function () {
        notification.info('hehe gitti mal');
      }).bind(this));
    },

    render: function (nick) {
      this.slug = nick;
      userController.getProfileWithSlug(nick, (function (profile) {
        profile.isAdmin = storage.permission > 1;
        this.setTitleAndDescription(profile.username);
        $(this.el).html(ProfileTemplate(profile));
      }).bind(this));
    }
  });
});
