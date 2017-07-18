define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var SearchTemplate = require('template!../../templates/search');
  var app = require('app');
  var utils = require('utils');

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

      if (text.match('^#')) {
        var str = text.substr(1);

        if (isNaN(str)) {
          return;
        }

        window.router.navigate('/entry/' + str, true);
      } else if (text.match('^@')) {
        window.router.navigate('/biri/' + text.substr(1), true);
      } else {
        if (!utils.title(text)) {
          return;
        }

        window.router.navigate('/q/' + text, true);
      }
    },

    render: function () {
      $(this.el).html(SearchTemplate({}));
    }
  });
});
