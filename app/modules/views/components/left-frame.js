define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LeftFrameTemplate = require('template!../../../templates/components/left-frame');
  var LeftFrameTopicItemTemplate = require('template!../../../templates/components/left-frame-topic-item');
  var topicController = require('../../controllers/topic');

  var TopicItemView = Backbone.View.extend({
    template: LeftFrameTopicItemTemplate,

    tagName: 'li',

    events: {},

    selfDestroy: function (e) {
      e.preventDefault();

      this.model.destroy();
    },

    initialize: function () {
      this.model.on('destroy', this.remove, this);
    },

    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  module.exports = Backbone.View.extend({
    template: LeftFrameTemplate,

    events: {},

    tagName: 'div',
    className: 'stairs',

    initialize: function () {
    },

    getTopics: function (next) {
      topicController.getTopics({}, function (collection) {
        next(collection);
      });
    },

    render: function () {
      $(this.el).html(this.template({title: 'bugün', subtitle: '25 başlık, 236 entry'}));
      this.getTopics((function (topics) {
        topics.forEach((function (model) {
          var item = new TopicItemView({model: model});
          $(this.el).find('ul').append(item.render().el);
        }).bind(this));
      }).bind(this));
    }
  });
});
