define(function (require, exports, module) {
  var $ = require('jquery');
  var Compose = require('./compose');
  var ComposeTemplate = require('template!../../../templates/components/compose-new');
  var topicController = require('../../controllers/topic');
  var utils = require('utils');
  var cache = require('cache');
  var app = require('app');

  module.exports = Compose.extend({
    template: ComposeTemplate,

    initialize: function () {
    },

    handleOk: function (e) {
      e.preventDefault();

      var text = $('#new_entry').val().trim();

      if (this.validate(text)) {
        topicController.newTopic(this.title, text, function (id) {
          cache.trigger('reload-left');
          app.router.navigate('/entry/' + id, true);
        });
      } else {
        utils.doNoty('error', 'yakışmadı');
      }
    },

    render: function (title) {
      this.title = title;
      $(this.el).html(ComposeTemplate({title: title}));
      return this;
    }
  });
});
