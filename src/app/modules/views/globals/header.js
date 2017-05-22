define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');
  var HeaderTemplate = require('template!../../../templates/globals/header');
  var SuggestListItemTemplate = require('template!../../../templates/components/suggest-list-item');
  var searchController = require('../../controllers/search');
  var storage = require('storage');

  var SuggestListItem = Backbone.View.extend({
    template: SuggestListItemTemplate,

    events: {
      'click': 'handleClickOnMe'
    },

    handleClickOnMe: function (e) {
      e.preventDefault();

      this.routeForEnterData(this.o);
    },

    initialize: function (options) {
      this.o = options.o;
      this.routeForEnterData = options.routeForEnterData;
    },

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

    timer: -1,
    timeout: 500,

    initialize: function () {
    },

    startTimer: function (e) {
      if (e.keyCode === 13) {
        this.doMatch();
      }

      clearTimeout(this.timer);
      this.timer = setTimeout(this.doSuggest.bind(this), this.timeout);
    },

    stopTimer: function (e) {
      clearTimeout(this.timer);
    },
    /**
     * @param data.users data
     * @param data.topics data
     */
    initSuggestBox: function (data) {
      var self = this;

      var searchInput = $('#search');
      var suggestArea = $('.search-suggestion');
      var ul = suggestArea.find('ul');
      ul.empty();

      if (data.topics.length || data.users.length) {
        _.forEach(data.topics, function (topic) {
          var suggestListItem = new SuggestListItem({
            o: topic,
            routeForEnterData: self.routeForEnterData
          });

          suggestListItem.render(topic.title);
          ul.append(suggestListItem.el);
        });

        _.forEach(data.users, function (user) {
          var suggestListItem = new SuggestListItem({
            o: user,
            routeForEnterData: self.routeForEnterData
          });

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

    routeForEnterData: function (data) {
      if (data) {
        if (!data.hasOwnProperty('username')) {
          window.router.navigate('/' + data.slug + '--' + data.id, true);
        } else {
          window.router.navigate('/biri/' + data.slug, true);
        }
      }
    },

    doMatch: function () {
      var searchInput = $('#search');
      var suggestArea = $('.search-suggestion');
      var text = searchInput.val().trim();

      if (text === '') {
        return;
      }

      if (text.match('^#')) {
        window.router.navigate('/entry/' + text.substr(1), true);
        return;
      }

      if (suggestArea.is(':visible')) {
        window.router.navigate('/q/' + text, true);
      } else {
        if (!text.match('^@')) {
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
        }
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

      if (this.lastText === text) {
        return;
      }

      this.lastText = text;

      if (!text.match('^#')) {
        searchController.suggest(text, (function (data) {
          this.initSuggestBox(data);
        }).bind(this));
      } else {
        suggestArea.hide();
      }
    },

    render: function () {
      $(this.el).html(HeaderTemplate({
        auth: false,
        name: window.sozlukName
      }));
    },

    renderWithAuth: function (auth) {
      $(this.el).html(HeaderTemplate({
        name: window.sozlukName,
        auth: auth,
        data: auth ? {
          slug: storage.slug,
          unread: window.unread || 'xoxo'
        } : {}
      }));
    }
  });
});
