define(function (require, exports, module) {
  var $ = require('jquery');
  var Compose = require('./compose');
  var ComposeTemplate = require('template!../../../templates/components/compose-edit');
  var utils = require('utils');
  var cache = require('cache');
  var app = require('app');

  module.exports = Compose.extend({
    template: ComposeTemplate,

    initialize: function () {
    },

    handleOk: function (e) {
      e.preventDefault();

      var id = this.model.get('id');
      var text = $('#new_entry').val().trim();

      if (this.validate(text)) {
        this.model.clear({silent: true});
        this.model.set('id', id);
        this.model.save({text: text}, {
          success: function () {
            app.router.navigate('/entry/' + id, true);
            utils.doNoty('success', 'ders aldın umarım');
          }
        });
      } else {
        utils.doNoty('error', 'yakışmadı');
      }
    },

    render: function () {
      $(this.el).html(ComposeTemplate(this.model.toJSON()));
      return this;
    }
  });
});
