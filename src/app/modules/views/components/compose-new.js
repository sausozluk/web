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

      $(e.target).prop('disabled', true);

      var text = $('#new_entry').val().trim();
      var length = this.title.length;

      if (this.validate(text)) {
        if (length > 0 && length < 51 && utils.title(this.title)) {
          topicController.newTopic(this.title, text, function (id) {
            eventBus.emit('reload-left');
            $(e.target).attr('disabled', false);
            window.router.navigate('/entry/' + id, true);
          });
        } else {
          notification.error('bu konuyla bi yere varamazsın');
          $(e.target).prop('disabled', false);
        }
      } else {
        notification.error('yakışmadı');
        $(e.target).prop('disabled', false);
      }
    },

    render: function (title) {
      this.title = title;
      $(this.el).html(ComposeTemplate({title: title}));
      return this;
    }
  });
});
