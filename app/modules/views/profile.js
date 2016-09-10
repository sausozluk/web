define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ProfileTemplate = require('template!../../templates/profile');

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" nickli kullanıcı işte'));
    },

    render: function (nick) {
      $(this.el).html(ProfileTemplate({nick: nick}));
      this.setTitleAndDescription(nick);
    }
  });
});
