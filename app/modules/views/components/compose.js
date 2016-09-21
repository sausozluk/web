define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ComposeTemplate = require('template!../../../templates/components/compose');
  var entryController = require('../../controllers/entry');
  var EntryModel = require('../../models/entry');
  var utils = require('utils');
  var storage = require('storage');
  var cache = require('cache');

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

    initialize: function (options) {
      this.entries = options.entries;
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

      var now = new Date().getTime();

      var text = $('#new_entry').val().trim();

      if (this.validate(text)) {
        entryController.newEntry({
          topic_id: this.model.get('id'),
          text: text
        }, (function (response) {
          this.entries.add(new EntryModel({
            id: response.data.id,
            text: text,
            user: {
              id: storage.id,
              username: storage.username,
              slug: storage.slug
            },
            created_at: now,
            updated_at: now,
            upvotes_count: 0,
            downvotes_count: 0
          }));

          utils.doNoty('success', 'vayyy, okuyo musunuz kaça gidiyosunuz?');
          $('#new_entry').val('');
          cache.trigger('reload-left');
        }).bind(this));
      } else {
        utils.doNoty('error', 'yakışmadı');
      }
    },

    render: function () {
      $(this.el).html(this.template({
        title: this.model.get('title')
      }));
      return this;
    }
  });
});
