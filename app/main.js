require(['extends', 'backbone', 'app', 'libraries/router'],
  function (_extends, Backbone, app, Router) {
    var isProduction = $('meta[name="production"]').attr('value');

    app.router = new Router();

    if (isProduction === 'true') {
      Backbone.history.start({pushState: true, root: app.root});
    } else {
      Backbone.history.start();
    }
  }
);
