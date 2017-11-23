require.config({
  paths: {
    'underscore': '../deps/lodash/dist/lodash.underscore',
    'lodash': '../deps/lodash/dist/lodash',
    'template': '../deps/lodash-template-loader/loader',
    'text': '../deps/text/text',
    'jquery': '../deps/jquery/dist/jquery',
    'backbone': '../deps/backbone/backbone',
    'nprogress': '../deps/nprogress/nprogress',
    'app': './app',
    'utils': './libraries/utils',
    'eventbus': './libraries/eventbus',
    'cache': './libraries/cache',
    'notification': './libraries/notification',
    'moment': '../deps/moment/min/moment-with-locales.min',
    'storage': './libraries/storage',
    'perfect-scrollbar': '../deps/perfect-scrollbar/js/perfect-scrollbar.jquery.min',
    'alertify': '../deps/alertifyjs/dist/js/alertify',
    'EasyAutocomplete': '../deps/EasyAutocomplete/dist/jquery.easy-autocomplete.min',
    'base64': '../deps/js-base64/base64.min'
  },

  lodashLoader: {
    ext: '.html'
  },

  deps: ['main'],

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery']
    },
    'template': {
      deps: ['lodash']
    },
    'EasyAutocomplete': {
      deps: ['jquery']
    },
    'perfect-scrollbar': {
      deps: ['jquery']
    }
  },

  config: {
    'modules/controllers/topic': {
      topicLimit: 20
    },
    'utils': {
      defaultToken: '3LD4V41' // if u lucky, get your lucky!
    },
    'app': {
      root: '/'
    }
  }
});
