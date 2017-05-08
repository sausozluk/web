define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var InboxTemplate = require('template!../../templates/chat');
  var ChatMessageItemTemplate = require('template!../../templates/components/chat-message-item');
  var cache = require('cache');
  var app = require('app');
  var socket = require('libraries/socket');
  var chatController = require('../controllers/chat');
  var userController = require('../controllers/user');
  var utils = require('utils');
  var storage = require('storage');
  var notification = require('notification');
  var eventBus = require('eventbus');

  var MessageItemView = Backbone.View.extend({
    template: ChatMessageItemTemplate,

    render: function () {
      var json = this.model;
      this.className = 'text-from-' + (json.user === storage.id ? 'me' : 'others');
      $(this.el).html(this.template(json));
      $(this.el).attr('class', this.className);
      return this;
    }
  });

  return Backbone.View.extend({
    title: 'mesaj',

    description: 'instant yürüme sistemi',

    events: {
      'click #ok': 'handleClickOk'
    },

    handleClickOk: function (e) {
      e.preventDefault();

      var textarea = $('#message');
      var message = textarea.val().trim();

      window.socket.send({
        action: 'send_message',
        data: {
          to: this.slug,
          message: message
        }
      });

      this.chat.append(new MessageItemView({
        model: {
          message: message,
          user: storage.id
        }
      }).render().el);

      this.goBottomOfChat();

      textarea.val('');
    },

    goBottomOfChat: function () {
      this.chat.animate({scrollTop: this.chat.prop('scrollHeight')}, 1000);
    },

    handleMessage: function (data) {
      if (data.slug === this.slug) {
        this.chat.append(new MessageItemView({
          model: {
            user: data.from,
            message: data.message
          }
        }).render().el);

        this.goBottomOfChat();
      }
    },

    render: function (slug) {
      var self = this;

      userController.getUserWithSlug(slug, function (user) {
        self.username = user.username;
        self.slug = slug;

        $(self.el).html(InboxTemplate({nick: self.username}));

        chatController.getChat(slug, function (messages) {
          self.chat = $(self.el).find('#chat');

          messages.forEach(function (model) {
            self.chat.append(new MessageItemView({model: model}).render().el);
          });

          self.goBottomOfChat();

          if (!socket.ready) {
            notification.error('mesajlaşma servisi çıktı, not alıyım istersen?');
          } else {
            $('#message').prop('disabled', false);
            $('#ok').prop('disabled', false);
            eventBus.on('message_received', self.handleMessage.bind(self));
          }
        });
      });
    },
    close: function () {
      eventBus.off('message_received');
    }
  });
});
