define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var SettingsTemplate = require('template!../../templates/settings');
  var SettingsTabComponent = require('./components/settings-tab');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    title: 'ayarlar',

    description: 'hurdalık gibi aynı ha',

    events: {},

    initialize: function () {
      this.settingsTabComponent = new SettingsTabComponent();
      this.settingsTabComponent.render();
    },

    render: function () {
      analytic.mixpanel('settings view');
      $(this.el).html(SettingsTemplate());
      $(this.el).find('.settings').html(this.settingsTabComponent.el);
    }
  });
});
