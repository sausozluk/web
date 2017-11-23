define(function (require, exports, module) {
  var AjaxModel = require('../models/ajax');

  module.exports = {
    'getSessionsWithSlug': function (slug, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/sessions/'+ slug);

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    }
  };
});