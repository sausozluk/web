define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ActivateTemplate = require('template!../../templates/activate');
  var UserController = require('../controllers/user');
  var notification = require('notification');

  module.exports = Backbone.View.extend({
    title: 'geliyor gönlümün efendisi',

    description: 'unknown artist',

    events: {},

    render: function (token) {
      $(this.el).html(ActivateTemplate({}));
      UserController.activate(token, function () {
        notification.info('gel gel sen de gel');
        window.router.navigate('/giris', true);
      });
    }
  });
});
