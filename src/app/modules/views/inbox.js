define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var InboxTemplate = require('template!../../templates/inbox');
  var ChatCommitItemTemplate = require('template!../../templates/components/inbox-chat-item');
  var chatController = require('../controllers/chat');
  var moment = require('moment');
  var utils = require('utils');
  var storage = require('storage');
  var notification = require('notification');
  require('EasyAutocomplete');

  var ChatItemView = Backbone.View.extend({
    events: {
      'click': 'clickMe',
      'click button.remove': 'removeChat'
    },

    noNavigateTags: ['a', 'button', 'i'],

    template: ChatCommitItemTemplate,

    tagName: 'li',

    removeChat: function (e) {
      e.preventDefault();

      notification.confirm('eminsin?', (function () {
        this.selfDestroy();
      }).bind(this));
    },

    selfDestroy: function () {
      var slug = this.model.get('users')[0].slug;
      var self = this;

      chatController.remove(slug, function () {
        notification.info('temizlik ya da trip?');
        self.remove();
      });
    },

    strCleaner: function (str) {
      return utils.br(utils.link(utils.hede(utils.yildiz(utils.bkz(_.escape(emoticon(str)))))));
    },

    clickMe: function (e) {
      var tag = $(e.target).prop('tagName').toLowerCase();

      if (this.noNavigateTags.indexOf(tag) > -1) {
        return;
      }

      var slug = this.model.get('users')[0].slug;

      window.router.navigate('/mesaj/' + slug, true);
    },

    render: function () {
      var json = this.model.toJSON();
      json['messages'][0].message = this.strCleaner(json['messages'][0].message);
      json.moment = moment;
      $(this.el).html(this.template(json));
      return this;
    }
  });

  module.exports = Backbone.View.extend({
    events: {
      'click .tabs-menu span': 'handleClickTab'
    },

    tagName: 'div',
    className: 'tabs-container',

    title: 'mesaj',

    description: 'instant yürüme sistemi',

    initNewMessage: function () {
      var el = $(this.el).find('#username');

      el.easyAutocomplete({
        url: function (phrase) {
          return window.apiUrl + '/search/user?q=' + phrase;
        },
        listLocation: function (response) {
          return response.data.filter(function (item) {
            return item.slug !== storage.slug;
          });
        },
        getValue: 'username',
        cssClasses: 'chat-user-search',
        requestDelay: 300,
        highlightPhrase: false,
        template: {
          type: 'custom',
          method: function (value, item) {
            return '<a href="/mesaj/' + item.slug + '">' + item.username + '</a>';
          }
        },
        list: {
          maxNumberOfElements: Infinity,
          sort: {
            enabled: false
          }
        },
        theme: 'dark'
      });
    },

    handleClickTab: function (e) {
      e.preventDefault();

      var target = $(e.target);
      var parent = target.parent();
      parent.addClass('current');
      parent.siblings().removeClass('current');
      var tab = target.data('id');
      $('.tab-content').not(tab).css('display', 'none');
      $(tab).show();

      if (tab === '#new-tab') {
        this.initNewMessage();
      }
    },

    render: function () {
      $(this.el).html(InboxTemplate());

      chatController.getInbox((function (collection) {
        var list = $(this.el).find('#inbox-tab').find('ul');

        collection.forEach(function (model) {
          list.append(new ChatItemView({model: model}).render().el);
        });
      }).bind(this));
    }
  });
});
