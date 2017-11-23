define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var SettingsTemplate = require('template!../../templates/settings');
  var SettingsTabComponent = require('./components/settings-tab');

  module.exports = Backbone.View.extend({
    title: 'ayarlar',

    description: 'hurdalık gibi aynı ha',

    events: {},

    initialize: function () {
      this.settingsTabComponent = new SettingsTabComponent();
      this.settingsTabComponent.render();
    },

    render: function () {
      $(this.el).html(SettingsTemplate());
      $(this.el).find('.settings').html(this.settingsTabComponent.el);
    }
  });
});
