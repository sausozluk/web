define(function (require, exports, module) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var NProgress = require('nprogress');

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
    },

    render: function () {
      $(this.el).before(ContentTemplate({}));
      this.headerView.render();
      this.leftView.render();
      this.contentView.render();
      $('#head').html($(this.headerView.el));
      $('#content').append($(this.leftView.el));
      $('#content').append($(this.contentView.el));
    },

    renderPage: function (activeView, args) {
      NProgress.start();
      var app = $('#app');
      app.removeClass();
      app.addClass('content');
      this.activeView = activeView;
      this.activeView.render.apply(this.activeView, args);
      app.html($(this.activeView.el)).promise().done(function () {
        NProgress.done();
      });
    }
  });
});
