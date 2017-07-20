define(function (require, exports, module) {
  var ReportModel = require('../models/report');

  module.exports = {
    'report': function (data, callback) {
      var reportModel = new ReportModel();

      reportModel.save(data, {
        success: function (model, response) {
          callback(response);
        }
      });
    }
  };
});