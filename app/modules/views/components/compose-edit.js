define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ComposeTemplate = require('template!../../../templates/components/compose-edit');
  var utils = require('utils');
  var cache = require('cache');
  var app = require('app');

  module.exports = Backbone.View.extend({
    template: ComposeTemplate,

    events: {
      'click #bkz': 'handleBkz',
      'click #yildiz': 'handleYildiz',
      'click #link': 'handleLink',
      'click #ok': 'handleOk'
    },

    tagName: 'div',
    className: 'compose',

    initialize: function () {
    },

    handleBkz: function (e) {
      e.preventDefault();

      var value = prompt('hangi başlığa bkz verilecek?');
      if (value) {
        utils.insertAtCaret('new_entry', '(bkz: ' + value + ')');
      }
    },

    handleYildiz: function (e) {
      e.preventDefault();

      var value = prompt('yıldız içinde ne görünecek?');
      if (value) {
        utils.insertAtCaret('new_entry', '`:' + value + '`');
      }
    },

    handleLink: function (e) {
      e.preventDefault();

      var address = prompt('hangi adrese gidecek?', 'http://');
      var text = prompt('verilecek linkin adı ne olacak?');
      if (address && text) {
        utils.insertAtCaret('new_entry', '[' + address + ' ' + text + ']');
      }
    },

    validate: function (text) {
      if (text.trim().length > 0) {
        return true;
      } else {
        return false;
      }
    },

    handleOk: function (e) {
      e.preventDefault();

      var id = this.model.get('id');
      var text = $('#new_entry').val();

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
