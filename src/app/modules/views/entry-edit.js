define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/entry-edit');
  var entryController = require('../controllers/entry');
  var ComposeEditComponent = require('./components/compose-edit');
  var storage = require('storage');
  var notification = require('notification');
  

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text + ' - saü sözlük';
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
      $('[name="twitter:title"]').attr('content', text);
      $('[name="twitter:description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
    },

    render: function (id) {
      entryController.getEntryById(id, (function (entry) {
        if (storage.id !== entry.get('user').id && storage.permission === 0) {
          window.router.navigate('/entry/' + entry.get('id'), true);
          notification.info('taklitçi olma kendin ol biraz');
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
