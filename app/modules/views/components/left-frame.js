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
      this.getTopics((function (topics) {
        $(this.el).html(this.template({
          title: 'bugün',
          subtitle: topics.topics_count + ' başlık, ' + topics.entries_count + ' entry'
        }));

        topics.forEach((function (model) {
          var item = new TopicItemView({model: model});
          $(this.el).find('ul').append(item.render().el);
        }).bind(this));
      }).bind(this));
    }
  });
});
