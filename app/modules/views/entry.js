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

    setTitleAndDescription: function (text, description) {
      document.title = text;
      $('[name="description"]').attr('content', description);
    },

    render: function (id) {
      entryController.getEntryById(id, (function (entry) {
        var json = entry.get('topic');
        json.site = module.config().site;
        $(this.el).html(TopicTemplate(json));
        this.setTitleAndDescription(
          entry.get('topic').title + ' - #' + entry.get('id'),
          entry.get('text')
        );

        var item = new EntryItemComponent({model: entry, single: true});
        $(this.el).find('.entries').append(item.render().el);
      }).bind(this));
    }
  });
});
