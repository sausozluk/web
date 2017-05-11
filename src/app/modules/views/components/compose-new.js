define(function (require, exports, module) {
  var $ = require('jquery');
  var Compose = require('./compose');
  var ComposeTemplate = require('template!../../../templates/components/compose-new');
  var topicController = require('../../controllers/topic');
  var utils = require('utils');
  var cache = require('cache');
  var app = require('app');
  var notification = require('notification');
  var eventBus = require('eventbus');

  module.exports = Compose.extend({
    template: ComposeTemplate,

    initialize: function () {
    },

    handleOk: function (e) {
      e.preventDefault();

      var text = $('#new_entry').val().trim();
      var length = text.length;

      if (this.validate(text)) {
        if (length > 0 && length < 51) {
          topicController.newTopic(this.title, text, function (id) {
            eventBus.emit('reload-left');
            window.router.navigate('/entry/' + id, true);
          });
        } else {
          notification.error('50 karakter uzun olamaz la');
        }
      } else {
        notification.error('yakışmadı');
      }
    },

    render: function (title) {
      this.title = title;
      $(this.el).html(ComposeTemplate({title: title}));
      return this;
    }
  });
});
