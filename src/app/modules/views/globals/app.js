define(function (require, exports, module) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var NProgress = require('nprogress');
  var eventBus = require('eventbus');

  var ContentTemplate = require('template!../../../templates/globals/app');

  var HeaderView = require('./header');
  var LeftView = require('./left');
  var ContentView = require('./content');

  module.exports = Backbone.View.extend({
    el: $('#app-js'),

    events: {},

    initialize: function () {
      this.headerView = new HeaderView();
      this.leftView = new LeftView();
      this.contentView = new ContentView();

      eventBus.on('auth-true', (function () {
        this.headerView.renderWithAuth(true);
      }).bind(this));

      eventBus.on('auth-false', (function () {
        this.headerView.renderWithAuth();
      }).bind(this));

      eventBus.on('reload-left', (function () {
        if (!!this.activeView && !!this.activeView.reload) {
          this.activeView.reload();
        }

        this.leftView.reload();
      }).bind(this));

      eventBus.on('unread', this.updateUnread.bind(this));
    },

    render: function () {
      $(this.el).before(ContentTemplate({}));
      this.headerView.render();
      this.leftView.render();
      this.contentView.render();
      $('#head').html($(this.headerView.el));
      this.contentEl = this.contentEl || $('#content');
      this.contentEl.append($(this.leftView.el));
      this.contentEl.append($(this.contentView.el));
    },

    setTitleAndDescription: function (title, description) {
      document.title = title;
      $('[name="description"]').attr('content', description);
    },

    renderPage: function (activeView, args) {
      NProgress.start();
      var app = $('#app');
      app.removeClass();
      app.addClass('content');
      this.activeView = activeView;
      this.activeView.render.apply(this.activeView, args);
      app.html($(this.activeView.el)).promise().done((function () {
        if (!!this.activeView.title && !!this.activeView.description) {
          this.setTitleAndDescription(this.activeView.title, this.activeView.description);
        }
        NProgress.done();
      }).bind(this));
    },

    updateUnread: function (count) {
      count = count || 0;
      $('.unread-count').text(count > 0 ? count : ':)');
      window.unread = count;
    }
  });
});
