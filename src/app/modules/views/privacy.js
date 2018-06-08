define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var PrivacyTemplate = require('template!../../templates/privacy');
  var utils = require('utils');

  module.exports = Backbone.View.extend({
    tagName: 'div',

    title: 'gizlilik',

    description: 'ciddi sayfa',

    strCleaner: function (str) {
      return utils.br(utils.link(utils.hede(utils.yildiz(utils.bkz(_.escape(str))))));
    },

    render: function () {
      mixpanel.track('privacy view');
      var self = this;

      $(self.el).html(PrivacyTemplate());
      var el = $(self.el).find('.cookie-policy');
      el.html(this.strCleaner(el.html()));
    }
  });
});
