define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');
  var QTemplate = require('template!../../templates/q');
  var ComposeNewComponent = require('./components/compose-new');
  var storage = require('storage');
  var searchController = require('../controllers/search');
  var app = require('app');
  var utils = require('utils');

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeylerle bilgilendir'));
    },

    continueRender: function (title) {
      $(this.el).html(QTemplate({title: title}));
      this.setTitleAndDescription(title);

      if (storage.id) {
        var item = new ComposeNewComponent();
        $(this.el).append(item.render(title).el);
      }
    },

    prettyTitle: function (title) {
      for (var i = 0; i < title.length; i++) {
        var char = title[i];
        if (!utils.title(char)) {
          title = title.replaceAt(i, ' ');
        }
      }

      return title.trim();
    },

    render: function (title) {
      title = this.prettyTitle(title);
      searchController.suggest(title, (function (data) {
        if (data.topics.length) {
          var result = _.find(data.topics, {title: title});
          if (result) {
            app.router.navigate('/' + result.slug + '--' + result.id, true);
          } else {
            this.continueRender(title);
          }
        } else {
          this.continueRender(title);
        }
      }).bind(this));
    }
  });
});
