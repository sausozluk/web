define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var NProgress = require('nprogress');
  var storage = require('storage');
  var notification = require('notification');
  require('perfect-scrollbar');

  module.exports = {
    htmlSubstring: function (s, n) {
      var m, r = /<([^>\s]*)[^>]*>/g,
        stack = [],
        lasti = 0,
        result = '';

      while ((m = r.exec(s)) && n) {
        var temp = s.substring(lasti, m.index).substr(0, n);
        result += temp;
        n -= temp.length;
        lasti = r.lastIndex;

        if (n) {
          result += m[0];
          if (m[1].indexOf('/') === 0) {

            stack.pop();
          } else if (m[1].lastIndexOf('/') !== m[1].length - 1) {
            stack.push(m[1]);
          }
        }
      }


      result += s.substr(lasti, n);

      while (stack.length) {
        result += '</' + stack.pop() + '>';
      }

      return result;
    },
    tokenCollectionSync: function (options) {
      options = options || {};

      options.beforeSend = function (xhr) {
        NProgress.start();
        xhr.setRequestHeader('token', (storage.token || module.config().defaultToken));
      };

      var _s = options.success;
      var _e = options.error;

      options.error = function (xhr, status, error) {
        NProgress.done();
        notification.error(xhr.status === 0 ? 'server gone :(' : 'fuck, we forgot something :(');
      };

      options.success = function (collection, response, xhr) {
        NProgress.done();
        if (!arguments[1].success) {
          var msg = arguments[1].message;
          if ($.isArray(msg)) {
            for (var i in msg) {
              notification.error(msg[i].replace('ValidationError:', '').trim());
            }
          } else {
            notification.error(msg.replace('ValidationError:', '').trim());
          }

          $('#ok').prop('disabled', false);
        } else {
          _s.apply(this, arguments);
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
          xhr.setRequestHeader('token', (storage.token || module.config().defaultToken)
          );
        };

        var _s = options.success;
        var _e = options.error;

        options.error = function (xhr, status, error) {
          NProgress.done();
          notification.error(xhr.status === 0 ? 'server gone :(' : 'fuck, we forgot something :(');
        };

        options.success = function () {
          NProgress.done();
          if (!arguments[0].success) {
            var msg = arguments[0].message;
            if ($.isArray(msg)) {
              for (var i in msg) {
                notification.error(msg[i].replace('ValidationError:', '').trim());
              }
            } else {
              notification.error(msg.replace('ValidationError:', '').trim());
            }

            $('#ok').prop('disabled', false);
          } else {
            _s.apply(this, arguments);
          }
        };

        return sync.call(Backbone, method, model, options);
      };
    },
    pageEventCleaner: function (app) {
      return function (req, next) {
        if (app.activeView) {
          if (app.activeView.close) {
            app.activeView.close();
          }
          app.activeView.remove();
          app.activeView.unbind();
        }

        next();
      };
    },
    gaHashPath: function (req, next) {
      if (window['ga']) {
        ga('send', 'pageview', {'page': location.pathname + location.search + location.hash});
      }

      next();
    },
    insertAtCaret: function (areaId, text) {
      var txtarea = document.getElementById(areaId);
      if (!txtarea) {
        return;
      }

      var scrollPos = txtarea.scrollTop;
      var strPos = 0;
      var br = ((txtarea.selectionStart || txtarea.selectionStart === '0') ?
        'ff' : (document.selection ? 'ie' : false ) );
      if (br === 'ie') {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
      } else if (br === 'ff') {
        strPos = txtarea.selectionStart;
      }

      var front = (txtarea.value).substring(0, strPos);
      var back = (txtarea.value).substring(strPos, txtarea.value.length);
      txtarea.value = front + text + back;
      strPos = strPos + text.length;
      if (br === 'ie') {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
      } else if (br === 'ff') {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
      }

      txtarea.scrollTop = scrollPos;
    },
    cleanPageMeta: function (req, next) {
      $('#prev').remove();
      $('#next').remove();

      next();
    },
    hede: function (str) {
      return str.replace(/`([^`]+)`/g, function (a, t) {
        if (t.match('^#')) {
          var entry_id = t.slice(1);
          return '<a href="/entry/' + entry_id + '">' + t + '</a>';
        } else {
          return '<a href="/q/' + t + '">' + t + '</a>';
        }
      });
    },
    bkz: function (str) {
      return str.replace(/\(bkz: *([^)]+)\)/g, function (a, t) {
        if (t.match('^#')) {
          var entry_id = t.slice(1);
          return '(bkz: <a href="/entry/' + entry_id + '">' + t + '</a>)';
        } else {
          return '(bkz: <a href="/q/' + t + '">' + t + '</a>)';
        }
      });
    },
    metaSuccess: function (req, next) {
      $('meta[name="prerender-status-code"]').attr('content', 200);
      next();
    },
    yildiz: function (str) {
      return str.replace(/`:([^`]+)`/g, function (a, t) {
        return '<a title="(bkz: ' + t + ')" href="/q/' + t + '">*</a>';
      });
    },
    link: function (str) {
      var getInfo = function (link) {
        var dummyEl = document.createElement('a');
        dummyEl.href = link;

        return {
          isLocal: location.hostname === dummyEl.hostname || !dummyEl.hostname.length,
          path: dummyEl.pathname
        };
      };

      return str.replace(/\[([^ ]+) +([^\]]+)]/g, function (a, t1, t2) {
        var info = getInfo(t1);

        return '<a ' + (info.isLocal ? '' : 'target="_blank"') + ' href="' + (info.isLocal ? info.path : t1) + '" ' + (info.isLocal ? '' : 'data-bypass') + '>' + t2 + ' <i class="fa fa-external-link"></i></a>';
      });
    },
    br: function (str) {
      return str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    },
    title: function (str) {
      var str_b = str.replace(new RegExp('\'', 'g'), '');

      if (str_b === '') {
        return false;
      }

      return /^[a-zA-Z $0-9ığüşöçİĞÜŞÖÇ.']+$/.test(str);
    },
    ws_uri: function () {
      var loc = window.location, new_uri;
      if (loc.protocol === 'https:') {
        new_uri = 'wss:';
      } else {
        new_uri = 'ws:';
      }
      new_uri += '//' + loc.host;
      return new_uri;
    },
    isPhantom: /PhantomJS/.test(window.navigator.userAgent),
    makeSearchInput: function (el) {
      el.easyAutocomplete({
        url: function (phrase) {
          return window.apiUrl + '/search?q=' + phrase;
        },
        listLocation: function (response) {
          var topics = response.data['topics'].map(function (item) {
            return {title: item.title, link: '/' + item.slug + '--' + item.id};
          });

          var users = response.data['users'].map(function (item) {
            return {title: '@' + item.username, link: '/biri/' + item.slug};
          });

          return topics.concat(users);
        },
        getValue: function (data) {
          return data ? data.title : '';
        },
        cssClasses: 'search',
        requestDelay: 300,
        highlightPhrase: false,
        list: {
          maxNumberOfElements: Infinity,
          sort: {
            enabled: false
          },
          onLoadEvent: function () {
            var container = $('.easy-autocomplete-container > ul');
            $(container).perfectScrollbar();
          }
        },
        template: {
          type: 'custom',
          method: function (value, item) {
            return '<a href="' + item.link + '">' + item.title + '</a>';
          }
        }
      });
    },
    delay: (function () {
      var timer = 0;
      return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })()
  };
});
