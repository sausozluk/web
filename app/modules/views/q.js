define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var QTemplate = require('template!../../templates/q');
  var ComposeNewComponent = require('./components/compose-new');

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeylerle bilgilendir'));
    },

    render: function (title) {
      $(this.el).html(QTemplate({title: title}));
      this.setTitleAndDescription(title);

      var item = new ComposeNewComponent();
      $(this.el).append(item.render(title).el);
    }
  });
});
