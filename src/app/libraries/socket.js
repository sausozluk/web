define(function (require, exports, module) {
  var storage = require('storage');
  var notification = require('notification');
  var utils = require('utils');
  var socketWorker = require('text!libraries/workers/socket.js');
  var eventBus = require('eventbus');
  var socketIoStr = require('text!libraries/vendor/socket.io.slim.js');
  var socketIoLibUrl = window['URL']['createObjectURL'](
    new Blob([socketIoStr], {type: 'text/javascript'})
  );

  module.exports = {
    worker: null,
    ready: false,
    init: function () {
      this.worker = new Worker(window['URL']['createObjectURL'](
        new Blob([socketWorker], {type: 'text/javascript'})
      ));

      this.worker.onmessage = this.onMessage.bind(this);
    },
    onMessage: function (e) {
      if (e.data === true) {
        this.ready = true;
      } else if (e.data === false) {
        this.ready = false;
      } else {
        if (e.data.action === 'receive_message') {
          eventBus.emit('message_received', e.data.data);
          this.notify(e.data.data);
        }
      }
    },
    notify: function (data) {
      var lookup = 'mesaj/' + data.slug;
      if (location.pathname.indexOf(lookup) === -1) {
        notification.info('[' + data.from + '] ' + data.message, function () {
          window.router.navigate('/mesaj/' + data.slug, true);
        });

        eventBus.emit('unread', window.unread + 1);
      }
    },
    send: function (data) {
      if (this.worker && this.ready) {
        this.worker.postMessage({action: 'message', data: data});
      }
    },
    start: function () {
      if (!this.ready && storage.token) {
        this.worker.postMessage({
          action: 'start',
          data: {url: utils.ws_uri(), token: storage.token, socketIoLib: socketIoLibUrl}
        });
      }
    },
    stop: function () {
      if (this.worker) {
        this.worker.postMessage({action: 'close'});
      }
    }
  };
});