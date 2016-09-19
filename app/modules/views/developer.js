define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var DeveloperTemplate = require('template!../../templates/developer');
  var DeveloperCommitItemTemplate = require('template!../../templates/components/developer-commit-item');
  var gitHubController = require('../controllers/github');

  var CommitItemView = Backbone.View.extend({
    template: DeveloperCommitItemTemplate,

    tagName: 'li',

    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  module.exports = Backbone.View.extend({
    events: {},

    title: 'gelistirici',

    description: 'oo kod, alırım bi dal',

    render: function () {
      $(this.el).html(DeveloperTemplate());

      gitHubController.getCommits((function (collection) {
        var list = $(this.el).find('ul');

        collection.forEach(function (model) {
          list.append(new CommitItemView({model: model}).render().el);
        });
      }).bind(this));
    }
  });
});
