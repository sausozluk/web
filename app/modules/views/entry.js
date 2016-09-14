define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/topic');
  var entryController = require('../controllers/entry');
  var EntryItemComponent = require('./components/entry-item');
  var storage = require('storage');
  var utils = require('utils');
  var cache = require('cache');
  var moment = require('moment');

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
    },

    render: function (id) {
      entryController.getEntryById(id, (function (entry) {
        $(this.el).html(TopicTemplate(entry.get('topic')));
        this.setTitleAndDescription(entry.get('topic').title);

        var item = new EntryItemComponent({model: entry});
        $(this.el).find('.entries').append(item.render().el);
      }).bind(this));
    }
  });
});