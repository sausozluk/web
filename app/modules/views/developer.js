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
    events: {
      'click .tabs-menu span': 'handleClickTab'
    },

    tagName: 'div',
    className: 'tabs-container',

    title: 'geliştirici',

    description: 'oo kod, alırım bi dal',

    handleClickTab: function (e) {
      e.preventDefault();

      var target = $(e.target);
      var parent = target.parent();
      parent.addClass('current');
      parent.siblings().removeClass('current');
      var tab = target.data('id');
      $('.tab-content').not(tab).css('display', 'none');
      $(tab).show();
    },

    render: function () {
      $(this.el).html(DeveloperTemplate());

      gitHubController.getWebCommits((function (collection) {
        var list = $(this.el).find('#web-tab').find('ul');

        collection.forEach(function (model) {
          list.append(new CommitItemView({model: model}).render().el);
        });
      }).bind(this));

      gitHubController.getApiCommits((function (collection) {
        var list = $(this.el).find('#api-tab').find('ul');

        collection.forEach(function (model) {
          list.append(new CommitItemView({model: model}).render().el);
        });
      }).bind(this));
    }
  });
});
