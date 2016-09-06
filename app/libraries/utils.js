define(function (require, exports, module) {
  var $ = require('jquery');
  require('jquery.cookie');
  require('jquery.noty');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var doNoty = function (type, message) {
    noty({
      type: type,
      text: message,
      timeout: 5000,
      layout: 'bottomRight'
    });
  };

  module.exports = {
    historyTrick: function () {
      $(document).on('click', 'a:not([data-bypass])', function (evt) {
        var href = {prop: $(this).prop('href'), attr: $(this).attr('href')};
        var root = location.protocol + '//' + location.host;
        root += Backbone.history.options.root;

        if (href.prop && href.prop.slice(0, root.length) === root) {
          evt.preventDefault();
          Backbone.history.navigate(href.attr, true);
        }
      });
    },
    tokenSync: function () {
      var sync = Backbone.sync;

      Backbone.sync = function (method, model, options) {
        options = options || {};

        options.beforeSend = function (xhr) {
          xhr.setRequestHeader(
            'Authorization', 'Token token=' +
            $.cookie('token') || module.config().defaultToken
          );
        };

        options.error = function (xhr, status, error) {
          doNoty('error', xhr.status === 0 ? 'server gone :(' : 'error!');
        };

        return sync.call(Backbone, method, model, options);
      };
    },
    pageEventCleaner: function (app) {
      return function () {
        if (app.activeView) {
          app.activeView.remove();
          app.activeView.unbind();
        }
      };
    },
    doNoty: doNoty
  };
});
