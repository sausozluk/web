define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var DeveloperTemplate = require('template!../../templates/developer');
  var DeveloperCommitItemTemplate = require('template!../../templates/components/developer-commit-item');
  var gitHubController = require('../controllers/github');
  var moment = require('moment');
  var utils = require('utils');

  var CommitItemView = Backbone.View.extend({
    template: DeveloperCommitItemTemplate,

    tagName: 'li',

    render: function () {
      var json = this.model.toJSON();
      json.moment = moment;
      $(this.el).html(this.template(json));
      return this;
    }
  });

  module.exports = Backbone.View.extend({
    events: {
      'click .tabs-menu span': 'handleClickTab'
    },

    tagName: 'div',
    className: 'tabs-container',

    title: 'olan biten',

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

    strCleaner: function (str) {
      return utils.br(utils.link(utils.yildiz(utils.bkz(_.escape(str)))));
    },

    render: function () {
      $(this.el).html(DeveloperTemplate());

      utils.colorize('#f1592b')({params: []}, function () {
        // done :)
      });

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

      var el = $(this.el).find('.about').get(0);
      el.innerHTML = this.strCleaner(el.innerText);
    }
  });
});
