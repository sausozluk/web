define(function (require, exports, module) {
  var $ = require('jquery');
  var Compose = require('./compose');
  var ComposeTemplate = require('template!../../../templates/components/compose-inbox');
  var utils = require('utils');
  var notification = require('notification');
  var storage = require('storage');

  module.exports = Compose.extend({
    template: ComposeTemplate,

    initialize: function () {
    },

    slug: '',

    handleOk: function (e) {
      e.preventDefault();

      var text = $('#new_entry').val().trim();

      if (!this.validate(text)) {
        notification.error('yakışmadı');
        return;
      }

      if (!this.validate(this.slug)) {
        notification.error('mesajlar birileri içindir');
        return;
      }

      if (this.slug === storage.slug) {
        notification.error('partenogenez?');
        return;
      }

      window.socket.send({
        action: 'send_message',
        data: {
          to: this.slug,
          message: text
        }
      });

      notification.info('yey :D');
      window.router.navigate('/mesaj/' + this.slug, true);
    },

    update: function (data) {
      var el = $(this.el).find('#new_entry');
      this.slug = data.slug;
      el.attr('placeholder', data.username + ' adlı yazara nası yürüyeceğini anlatsana :>');
    },

    render: function () {
      $(this.el).html(ComposeTemplate());
      return this;
    }
  });
});
