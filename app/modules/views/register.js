define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var RegisterTemplate = require('template!../../templates/register');

  module.exports = Backbone.View.extend({
    events: {
    },

    render: function () {
      $(this.el).html(RegisterTemplate({}));
    }
  });
});
