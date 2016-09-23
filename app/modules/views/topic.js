define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var TopicTemplate = require('template!../../templates/topic');
  var PagerTemplate = require('template!../../templates/components/pager');
  var topicController = require('../controllers/topic');
  var ComposeComponent = require('./components/compose');
  var EntryItemComponent = require('./components/entry-item');
  var storage = require('storage');
  var app = require('app');
  var cache = require('cache');
  var moment = require('moment');

  module.exports = Backbone.View.extend({
    events: {
      'change #page': 'handleChangePage'
    },

    handleChangePage: function (e) {
      e.preventDefault();
      var page = $(e.target).val();
      app.router.navigate('/' + this.topicUrl + '--' + this.topicId + '/' + page, true);
    },

    setTitleAndDescription: function (text) {
      document.title = text;
      $('[name="description"]').attr('content', ('"' + text + '" hakkında gereksiz şeyler içerir'));
    },

    renderCompose: function (model, entries) {
      this.composeComponent = new ComposeComponent({model: model, entries: entries});
      $(this.el).find('.pager').after(this.composeComponent.render().el);
    },

    goEntry: function (model) {
      app.router.navigate('/entry/' + model.get('id'), true);
    },

    generatePager: function () {
      $(this.el).find('.pager').html(PagerTemplate({
        id: this.topicId,
        slug: this.topicUrl,
        current_page: this.currentPage,
        total_page: this.totalPage
      }));
    },

    handleDestroyEntry: function (model, collection) {
      if (!collection.length) {
        app.router.navigate('/', true);
      }
    },

    render: function (url, id, page) {
      this.topicUrl = url;
      this.topicId = id;
      this.currentPage = page ? parseInt(page) : 1;
      topicController.getTopicByIdAndPage(this.topicId, this.currentPage, (function (topic) {
        var json = topic.toJSON();
        json.site = module.config().site;
        $(this.el).html(TopicTemplate(json));

        this.setTitleAndDescription(topic.get('title'));
        this.totalPage = topic.get('total_page');

        this.entriesEl = $(this.el).find('.entries');

        topic.entries.on('add', this.goEntry, this);
        topic.entries.on('destroy', this.handleDestroyEntry, this);

        topic.entries.forEach((function (model) {
          var item = new EntryItemComponent({model: model});
          this.entriesEl.append(item.render().el);
        }).bind(this));

        this.generatePager();

        if (storage.username) {
          this.renderCompose(topic, topic.entries);
        }
      }).bind(this));
    }
  });
});
