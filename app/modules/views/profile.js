define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ProfileTemplate = require('template!../../templates/profile');
  var storage = require('storage');

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="Description"]').attr('content', ('"' + text + '" nickli kullanıcı işte'));
    },

    render: function (nick) {
      $(this.el).html(ProfileTemplate({nick: storage.username}));
      this.setTitleAndDescription(nick);
    }
  });
});
