define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var InboxTemplate = require('template!../../templates/chat');
  var ChatMessageItemTemplate = require('template!../../templates/components/chat-message-item');
  var chatController = require('../controllers/chat');
  var userController = require('../controllers/user');
  var storage = require('storage');
  var eventBus = require('eventbus');
  var moment = require('moment');
  var utils = require('utils');
  var notification = require('notification');

  var MessageItemView = Backbone.View.extend({
    template: ChatMessageItemTemplate,

    events: {
      'click .text': 'toggleDate'
    },

    className: 'message-wrapper',

    strCleaner: function (str) {
      return utils.br(utils.link(utils.hede(utils.yildiz(utils.bkz(_.escape(emoticon(str)))))));
    },

    toggleDate: function (e) {
      if ($(e.target).prop('tagName').toLowerCase() === 'a') {
        return;
      }

      $(this.el).find('.date').fadeToggle();
    },

    render: function () {
      var json = this.model;
      var str = '';
      json.fromMe = json.user === storage.id;

      if (json['deleted']) {
        str = json['deleted'].indexOf(storage.id) > -1 ? ' <i class="fa fa-trash" aria-hidden="true"></i>' : '';
      }

      json.message = this.strCleaner(json.message) + str;
      json.date = moment(json.date).format('DD.MM.YYYY HH:mm') + '\'de gönderildi';
      $(this.el).html(this.template(json));
      return this;
    }
  });

  return Backbone.View.extend({
    title: 'mesaj',

    description: 'instant yürüme sistemi',

    className: 'chat-page',

    events: {
      'click #bkz': 'handleBkz',
      'click #hede': 'handleHede',
      'click #yildiz': 'handleYildiz',
      'click #spoiler': 'handleSpoiler',
      'click #link': 'handleLink',
      'click #ok': 'handleClickOk',
      'keyup #message': 'handlePressEnter'
    },

    handleBkz: function (e) {
      e.preventDefault();

      notification.prompt('hangi başlığa bkz verilecek?', '', function (value) {
        if (value) {
          utils.insertAtCaret('message', '(bkz: ' + value.toLowerCase() + ')');
        }
      }, {ok: 'hadi bakalım', cancel: 'neyse ya'});
    },

    handleHede: function (e) {
      e.preventDefault();

      notification.prompt('hangi başlık için link oluşturulacak?', '', function (value) {
        if (value) {
          utils.insertAtCaret('message', '`' + value.toLowerCase() + '`');
        }
      }, {ok: 'hadi bakalım', cancel: 'neyse ya'});
    },

    handleYildiz: function (e) {
      e.preventDefault();

      notification.prompt('yıldız içinde ne görünecek?', '', function (value) {
        if (value) {
          utils.insertAtCaret('message', '`:' + value.toLowerCase() + '`');
        }
      }, {ok: 'hazırım ışınla', cancel: 'boşver'});
    },

    handleSpoiler: function (e) {
      e.preventDefault();

      notification.prompt('spoiler içine ne yazılacak?', '', function (value) {
        if (value) {
          var s = '---  `spoiler` ---';
          utils.insertAtCaret('message', s + '\n\n' + value.toLowerCase() + '\n\n' + s);
        }
      }, {ok: 'hadi bakalım', cancel: 'neyse ya'});
    },

    handleLink: function (e) {
      e.preventDefault();

      notification.prompt('hangi adrese gidecek?', 'http://', function (address) {
        notification.prompt('verilecek linkin adı ne olacak?', '', function (text) {
          if (address && text) {
            utils.insertAtCaret('message', '[' + address + ' ' + text + ']');
          }
        }, {ok: 'heh oldu', cancel: 'vazgeçtim'});
      }, {ok: 'sıradaki gelsin', cancel: 'burada duralım'});
    },

    handlePressEnter: function (e) {
      e.preventDefault();

      if (e.keyCode === 13) {
        this.handleClickOk(e);
      }
    },

    validate: function (text) {
      return text.trim().length > 0;
    },

    handleClickOk: function (e) {
      e.preventDefault();

      var textarea = $('#message');
      var message = textarea.val().trim();

      if (!this.validate(message)) {
        return;
      }

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
          user: storage.id,
          date: new Date(),
          seen: false,
          deleted: []

        }
      }).render().el);

      this.goBottomOfChat();

      textarea.val('');
    },

    goBottomOfChat: function () {
      $('html, body').scrollTop(this.chat.height());
    },

    handleMessage: function (data) {
      if (data.slug === this.slug) {
        this.chat.append(new MessageItemView({
          model: {
            user: data.from,
            message: data.message,
            date: new Date(),
            seen: true,
            deleted: []
          }
        }).render().el);

        this.goBottomOfChat();

        window.socket.send({
          action: 'mark_messages',
          data: {
            to: this.slug
          }
        });
      }
    },

    render: function (slug) {
      var self = this;

      if (storage.slug === slug) {
        window.router.navigate('/mesaj', {trigger: true, replace: true});
        return;
      }

      $('#app').addClass('chat-open');

      userController.getUserWithSlug(slug, function (user) {
        self.username = user.username;
        self.slug = slug;

        $(self.el).html(InboxTemplate({nick: self.username, slug: self.slug}));

        chatController.getChat(slug, function (messages) {
          self.chat = $(self.el).find('#chat');

          messages.forEach(function (model) {
            self.chat.append(new MessageItemView({model: model}).render().el);
          });

          self.goBottomOfChat();

          $('#message').prop('disabled', false);
          $('#ok').prop('disabled', false);
          eventBus.on('message_received', self.handleMessage.bind(self));
        });
      });
    },
    close: function () {
      eventBus.off('message_received');
    }
  });
});
