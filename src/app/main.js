require(['extends', 'backbone', 'utils', 'app', 'libraries/router', 'libraries/socket'],
  function (_extends, Backbone, utils, app, Router, Socket) {
    window.router = new Router();
    window.socket = Socket;
    window.socket.init();

    utils.tokenSync();

    Backbone.history.start({pushState: true, root: app.root});

    window.cookieconsent.initialise({
      'palette': {
        'popup': {
          'background': '#333'
        },
        'button': {
          'background': 'transparent',
          'border': '#53a245',
          'text': '#53a245'
        }
      },
      'content': {
        'message': 'Cookie kullanıyoruz haberiniz olsun.',
        'dismiss': 'Eyw',
        'link': 'Ne ki bu?',
        'href': '/gizlilik'
      }
    });
  }
);
