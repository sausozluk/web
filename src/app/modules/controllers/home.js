define(function (require, exports, module) {
  var AjaxModel = require('../models/ajax');

  module.exports = {
    'managers': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/managers');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    },
    'activities': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/activities');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    },
    'online': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/online');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    },
    'forceGlobalLogout': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/force-global-logout');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response);
        }
      });
    }
  };
});