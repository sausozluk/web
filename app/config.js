require.config({
  paths: {
    'underscore': '../deps/lodash/dist/lodash.underscore',
    'lodash': '../deps/lodash/dist/lodash',
    'template': '../deps/lodash-template-loader/loader',
    'jquery': '../deps/jquery/dist/jquery',
    'backbone': '../deps/backbone/backbone',
    'jquery.cookie': '../deps/jquery.cookie/jquery.cookie',
    'jquery.noty': '../deps/noty/js/noty/packaged/jquery.noty.packaged',
    'nprogress': '../deps/nprogress/nprogress',
    'backbone.middleware': '../deps/backbone.middleware/backbone.middleware',
    'app': './app',
    'utils': './libraries/utils',
    'cache': './libraries/cache'
  },

  lodashLoader: {
    ext: '.tpl'
  },

  deps: ['main'],

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery']
    },
    'jquery.cookie': {
      deps: ['jquery']
    },
    'jquery.noty': {
      deps: ['jquery']
    },
    'template': {
      deps: ['lodash']
    },
    'backbone.middleware': {
      deps: ['backbone']
    }
  },

  config: {
    'modules/models/base': {
      apiUrl: 'http://localhost:3000'
    },
    'modules/collections/base': {
      apiUrl: 'http://localhost:3000'
    },
    'utils': {
      defaultToken: '3LD4V41' // if u lucky, get your lucky!
    },
    'modules/views/globals/content': {
      pageLoadTimeout: 250 // if u need
    },
    'app': {
      root: '/'
    }
  }
});
