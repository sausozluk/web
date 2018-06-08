define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ModTemplate = require('template!../../templates/mod');
  var ReportItemTemplate = require('template!../../templates/components/report-item');
  var reportController = require('../controllers/report');
  var notification = require('notification');

  var ReportItem = Backbone.View.extend({
    template: ReportItemTemplate,

    initialize: function () {
      this.model.on('destroy', this.remove, this);
    },

    events: {
      'click .remove': 'handleClickRemove'
    },

    handleClickRemove: function (e) {
      e.preventDefault();

      notification.confirm('eminsin?', (function () {
        this.selfDestroy();
      }).bind(this));
    },

    selfDestroy: function () {
      this.model.destroy({
        success: (function () {
          notification.info('herks mutludur şimdi');
        }).bind(this)
      });
    },

    render: function () {
      var json = this.model.toJSON();
      $(this.el).html(this.template(json));
      return this;
    }
  });

  module.exports = Backbone.View.extend({
    tagName: 'div',

    title: 'yetkili abi yeri',

    description: 'what a cool girl/guy',

    render: function () {
      mixpanel.track('moderation view');
      var self = this;

      $(this.el).html(ModTemplate());

      reportController.getReports(function (collection) {
        collection.sortBy(function (a, b) {
          var date_a = new Date(a.createdAt);
          var date_b = new Date(b.createdAt);

          return date_b.getTime() - date_a.getTime();
        });

        var el = $(self.el).find('.reports');

        collection.forEach(function (model) {
          var item = new ReportItem({model: model});
          el.append(item.render().el);
        });
      });
    }
  });
});
