define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var SettingsTemplate = require('template!../../templates/settings');

  module.exports = Backbone.View.extend({
    title: 'ayarlar',

    description: 'hurdalık gibi aynı ha',

    events: {},

    render: function () {
      $(this.el).html(SettingsTemplate());
    }
  });
});
