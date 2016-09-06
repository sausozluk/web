define(function (require, exports, module) {
  var AjaxModel = require('../models/ajax');

  module.exports = {
    'doLogin': function (data, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/sessions');

      ajaxModel.save(data, {
        success: function (model, response) {
          callback(response);
        }
      });
    },
    'check-token': function (data, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/sessions/check');

      ajaxModel.save({}, {
        success: function (model, response) {
          callback(response.data.isAlive);
        }
      });
    },
    'logout': function (data, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.set('id', +new Date());
      ajaxModel.changeUrl('/sessions');

      ajaxModel.destroy({
        url: ajaxModel.urlRoot(),
        success: function (model, response) {
          callback();
        }
      });
    },
    'register': function (data, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/users');

      ajaxModel.save(data, {
        success: function (model, response) {
          callback(response);
        }
      });
    }
  };
});