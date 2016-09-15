define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ComposeTemplate = require('template!../../../templates/components/compose-new');
  var topicController = require('../../controllers/topic');
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

      var text = $('#new_entry').val();

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
