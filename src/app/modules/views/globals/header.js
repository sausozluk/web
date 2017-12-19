define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');
  var HeaderTemplate = require('template!../../../templates/globals/header');
  var searchController = require('../../controllers/search');
  var storage = require('storage');
  var utils = require('utils');

  module.exports = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'keyup .search-input': 'typeSearch',
    },

    typeSearch: function (e) {
      if (e.keyCode === 13) {
        this.doMatch();
      }
    },

    doMatch: function () {
      var searchInput = $(this.el).find('.search-input');
      var text = searchInput.val().trim();

      if (text === '') {
        return;
      }

      if (text.match('^#')) {
        var str = text.substr(1);

        if (isNaN(str)) {
          return;
        }

        window.router.navigate('/entry/' + str, true);
        return;
      }

      if (!text.match('^@')) {
        if (!utils.title(text)) {
          return;
        }

        searchController.suggest(text, (function (data) {
          if (!data.topics.length) {
            window.router.navigate('/q/' + text, true);
          } else {
            var result = _.find(data.topics, {title: text});
            if (result) {
              window.router.navigate('/' + result.slug + '--' + result.id, true);
            } else {
              window.router.navigate('/q/' + text, true);
            }
          }
        }).bind(this));
      } else {
        window.router.navigate('/biri/' + text.substr(1), true);
      }
    },

    render: function () {
      $(this.el).html(HeaderTemplate({
        auth: false,
        name: window.sozlukName
      }));
    },

    renderWithAuth: function (auth) {
      var count = window.unread || 0;

      $(this.el).html(HeaderTemplate({
        name: window.sozlukName,
        isMod: storage.permission > 0,
        isAdmin: storage.permission > 1,
        auth: auth,
        data: auth ? {
          slug: storage.slug,
          unread: count
        } : {}
      }));

      if (!count) {
        $(this.el).find('.unread-count').hide();
      }

      var searchInput = $(this.el).find('.search-input');
      utils.makeSearchInput(searchInput);
    }
  });
});
