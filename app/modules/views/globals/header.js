define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var HeaderTemplate = require('template!../../../templates/globals/header');
  var SuggestListItemTemplate = require('template!../../../templates/components/suggest-list-item');
  var searchController = require('../../controllers/search');
  var storage = require('storage');
  var app = require('app');

  var SuggestListItem = Backbone.View.extend({
    template: SuggestListItemTemplate,

    tagName: 'li',

    render: function (text) {
      $(this.el).html(SuggestListItemTemplate({text: text}));
    }
  });

  module.exports = Backbone.View.extend({
    events: {
      'keyup #search': 'startTimer',
      'keydown #search': 'stopTimer'
    },

    initialize: function () {
    },

    timer: -1,
    timeout: 500,

    startTimer: function (e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.doSuggest.bind(this), this.timeout);
    },

    stopTimer: function (e) {
      clearTimeout(this.timer);
    },

    doSuggest: function () {
      var searchInput = $('#search');
      var suggestArea = $('.search-suggestion');
      var text = searchInput.val().trim();

      if (text === '') {
        suggestArea.hide();
        return;
      }

      if (!text.startsWith('#')) {
        searchController.suggest(text, function (data) {
          var ul = suggestArea.find('ul');
          ul.empty();

          if (data.topics.length || data.users.length) {
            _.forEach(data.topics, function (topic) {
              var suggestListItem = new SuggestListItem();
              suggestListItem.render(topic.title);
              ul.append(suggestListItem.el);
            });

            _.forEach(data.users, function (user) {
              var suggestListItem = new SuggestListItem();
              suggestListItem.render('@' + user.username);
              ul.append(suggestListItem.el);
            });

            suggestArea.css({
              position: 'absolute',
              top: (searchInput.offsetTop + searchInput.offsetHeight - 12) + 'px',
              left: searchInput.offsetLeft + 'px'
            });

            suggestArea.show();
          } else {
            suggestArea.hide();
          }
        });
      } else {
        suggestArea.hide();
      }
    },

    render: function () {
      $(this.el).html(HeaderTemplate({auth: false}));
    },

    renderWithAuth: function (auth) {
      $(this.el).html(HeaderTemplate({
        auth: auth, data: auth ? {
          slug: storage.slug
        } : {}
      }));
    }
  });
});
