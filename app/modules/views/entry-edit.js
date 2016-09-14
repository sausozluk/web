define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/entry-edit');
  var entryController = require('../controllers/entry');
  var ComposeEditComponent = require('./components/compose-edit');
  var storage = require('storage');
  var utils = require('utils');
  var cache = require('cache');
  var moment = require('moment');
  var app = require('app');

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
    },

    render: function (id) {
      entryController.getEntryById(id, (function (entry) {
        if (storage.id !== entry.get('user').id) {
          app.router.navigate('/entry/' + entry.get('id'), true);
          utils.doNoty('success', 'taklitçi olma kendin ol biraz');
          return;
        }

        $(this.el).html(TopicTemplate(entry.get('topic')));
        this.setTitleAndDescription(entry.get('topic').title);

        var item = new ComposeEditComponent({model: entry});
        $(this.el).after(item.render().el);
      }).bind(this));
    }
  });
});
