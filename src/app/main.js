require(['extends', 'backbone', 'utils', 'app', 'libraries/router', 'libraries/socket'],
  function (_extends, Backbone, utils, app, Router, Socket) {
    window.router = new Router();
    window.socket = Socket;
    window.socket.init();

    utils.tokenSync();

    Backbone.history.start({pushState: true, root: app.root});
  }
);
