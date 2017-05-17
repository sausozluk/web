require(['jquery', 'backbone', 'moment', 'libraries/vendor/emoji-strip', 'notification', 'nprogress'],
  function ($, Backbone, moment, emojiStrip, notification, NProgress) {
    moment['locale']('tr');

    String.prototype.replaceAll = function (search, replacement) {
      return this.replace(new RegExp(search, 'g'), replacement);
    };

    String.prototype.replaceAt = function (index, character) {
      return this.substr(0, index) + character + this.substr(index + character.length);
    };

    window['onerror'] = function (message, url, line) {
      notification.error(message);

      console.log({error: message, url: url, line: line});

      return false;
    };

    $(document).on('click', 'a:not([data-bypass])', function (evt) {
      var href = {prop: $(this).prop('href'), attr: $(this).attr('href')};
      var root = location.protocol + '//' + location.host;
      root += Backbone.history.options.root;

      if (href.prop && href.prop.slice(0, root.length) === root) {
        evt.preventDefault();
        Backbone.history.navigate(href.attr, true);
      }
    });

    var counter = 0;

    var oldStart = NProgress.start;
    var oldDone = NProgress.done;

    NProgress.start = function () {
      counter++;
      if (counter === 1) {
        oldStart.apply(this, arguments);
      }
    };

    NProgress.done = function () {
      counter--;
      if (counter === 0) {
        oldDone.apply(this, arguments);
      }
    };

    return true;
  });