define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var HomeTemplate = require('template!../../templates/home');
  var RandomTemplate = require('template!../../templates/components/random');
  var EntryItemComponent = require('./components/entry-item');
  var topicController = require('../controllers/topic');
  var analytic = require('analytic');

  module.exports = Backbone.View.extend({
    title: window.sozlukName,

    description: 'langenscheidt gibi',

    events: {},

    render: function () {
      analytic.mixpanel('home view');
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
