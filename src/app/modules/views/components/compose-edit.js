define(function (require, exports, module) {
  var $ = require('jquery');
  var Compose = require('./compose');
  var ComposeTemplate = require('template!../../../templates/components/compose-edit');
  var utils = require('utils');
  var cache = require('cache');
  var app = require('app');
  var notification = require('notification');

  module.exports = Compose.extend({
    template: ComposeTemplate,

    initialize: function () {
    },

    handleOk: function (e) {
      e.preventDefault();

      $(e.target).prop('disabled', true);

      var id = this.model.get('id');
      var text = $('#new_entry').val().trim();

      if (this.validate(text)) {
        this.model.clear({silent: true});
        this.model.set('id', id);
        this.model.save({text: text}, {
          success: function () {
            $(e.target).prop('disabled', false);
            window.router.navigate('/entry/' + id, true);
            notification.info('ders aldın umarım');
          }
        });
      } else {
        notification.error('yakışmadı');
        $(e.target).prop('disabled', false);
      }
    },

    render: function () {
      $(this.el).html(ComposeTemplate(this.model.toJSON()));
      return this;
    }
  });
});
