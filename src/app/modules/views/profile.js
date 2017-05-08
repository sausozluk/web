define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ProfileTemplate = require('template!../../templates/profile');
  var userController = require('../controllers/user');
  var storage = require('storage');

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" nickli kullanıcı işte'));
    },

    render: function (nick) {
      userController.getProfileWithSlug(nick, (function (profile) {
        this.setTitleAndDescription(profile.username);
        $(this.el).html(ProfileTemplate(profile));
      }).bind(this));
    }
  });
});
