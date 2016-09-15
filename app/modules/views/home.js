define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var HomeTemplate = require('template!../../templates/home');
  var RandomTemplate = require('template!../../templates/components/random');
  var EntryItemComponent = require('./components/entry-item');
  var topicController = require('../controllers/topic');

  module.exports = Backbone.View.extend({
    title: 'saüsözlük',

    description: 'sakarya üniversitesi\'nin interaktif sözlüğü gibi',

    events: {},

    render: function () {
      $(this.el).html(HomeTemplate({}));

      topicController.random((function (collection) {
        collection.forEach((function (random) {
          var el = $(RandomTemplate(random.topic.toJSON()));
          var item = new EntryItemComponent({model: random.entry});
          $(el.get(2)).append(item.render().el);
          $(this.el).append(el);
        }).bind(this));
      }).bind(this));
    }
  });
});
