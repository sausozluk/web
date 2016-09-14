define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var HeaderTemplate = require('template!../../../templates/globals/header');
  var SuggestListItemTemplate = require('template!../../../templates/components/suggest-list-item');
  var searchController = require('../../controllers/search');
  var storage = require('storage');
  var getApp = function () {
    return require('app');
  };

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
      if (e.keyCode === 13) {
        this.doMatch();
        clearTimeout(this.timer);
      } else {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.doSuggest.bind(this), this.timeout);
      }
    },

    stopTimer: function (e) {
      clearTimeout(this.timer);
    },
    /**
     * @param data.users data
     * @param data.topics data
     */
    initSuggestBox: function (data) {
      var searchInput = $('#search');
      var suggestArea = $('.search-suggestion');
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
    },

    doMatch: function () {
      var searchInput = $('#search');
      var suggestArea = $('.search-suggestion');
      var router = getApp().router;

      var text = searchInput.val().trim();

      if (text === '') {
        return;
      }

      if (text.startsWith('#')) {
        router.navigate('/entry/' + text.substr(1), true);
        return;
      }

      if (suggestArea.is(':visible')) {
        if (this.forEnter) {
          if (!this.forEnter.hasOwnProperty('username')) {
            router.navigate('/' + this.forEnter.slug + '--' + this.forEnter.id, true);
          } else {
            router.navigate('/biri/' + this.forEnter.slug, true);
          }
        }
      } else {
      }
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
        searchController.suggest(text, (function (data) {
          this.initSuggestBox(data);
          this.forEnter = data.topics.concat(data.users).slice(0, 1)[0];
        }).bind(this));
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
