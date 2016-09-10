define(function (require, exports, module) {
  var $ = require('jquery');
  require('jquery.noty');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var NProgress = require('nprogress');
  var storage = require('storage');

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
    tokenCollectionSync: function (options) {
      options = options || {};

      options.beforeSend = function (xhr) {
        NProgress.start();
        xhr.setRequestHeader(
          'Authorization', 'Token token=' +
          (storage.token || module.config().defaultToken)
        );
      };

      options.error = function (xhr, status, error) {
        NProgress.done();
        doNoty('error', xhr.status === 0 ? 'server gone :(' : 'fuck, we forgot something :(');
      };

      var _ = options.success;

      options.success = function (collection, response, xhr) {
        NProgress.done();
        if (!arguments[1].success) {
          var msg = arguments[1].message;
          if ($.isArray(msg)) {
            for (var i in msg) {
              doNoty('error', msg[i]);
            }
          } else {
            doNoty('error', msg);
          }
        } else {
          _.apply(this, arguments);
        }
      };

      return options;
    },
    tokenSync: function () {
      var sync = Backbone.sync;

      Backbone.sync = function (method, model, options) {
        options = options || {};

        options.beforeSend = function (xhr) {
          NProgress.start();
          xhr.setRequestHeader(
            'Authorization', 'Token token=' +
            (storage.token || module.config().defaultToken)
          );
        };

        options.error = function (xhr, status, error) {
          NProgress.done();
          doNoty('error', xhr.status === 0 ? 'server gone :(' : 'fuck, we forgot something :(');
        };

        var _ = options.success;

        options.success = function () {
          NProgress.done();
          if (!arguments[0].success) {
            var msg = arguments[0].message;
            if ($.isArray(msg)) {
              for (var i in msg) {
                doNoty('error', msg[i]);
              }
            } else {
              doNoty('error', msg);
            }
          } else {
            _.apply(this, arguments);
          }
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
    defineGlobalErrorHandler: function () {
      window.onerror = function (message, url, line) {
        doNoty('error', message);

        console.log({
          error: message,
          url: url,
          line: line
        });

        return true;
      };
    },
    doNoty: doNoty
  };
});
