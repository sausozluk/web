define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var SearchTemplate = require('template!../../templates/search');
  var app = require('app');

  module.exports = Backbone.View.extend({
    title: 'ara',

    description: 'google gibi',

    events: {
      'keyup #search-page-input': 'handleKeyUp',
      'click #ok': 'handleOk'
    },

    handleOk: function (e) {
      e.preventDefault();

      this.doSearch();
    },

    handleKeyUp: function (e) {
      e.preventDefault();

      if (e.keyCode === 13) {
        this.doSearch();
      }
    },

    doSearch: function () {
      var text = $('#search-page-input').val().trim();

      if (text === '') {
        return;
      }

      if (text.startsWith('#')) {
        app.router.navigate('/entry/' + text.substr(1), true);
      } else if (text.startsWith('@')) {
        app.router.navigate('/biri/' + text.substr(1), true);
      } else {
        app.router.navigate('/q/' + text, true);
      }
    },

    render: function () {
      $(this.el).html(SearchTemplate({}));
    }
  });
});
