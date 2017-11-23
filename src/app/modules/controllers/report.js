define(function (require, exports, module) {
  var ReportModel = require('../models/report');
  var ReportCollection = require('../collections/report');

  module.exports = {
    'report': function (data, callback) {
      var reportModel = new ReportModel();

      reportModel.save(data, {
        success: function (model, response) {
          callback(response);
        }
      });
    },
    'getReports': function (callback) {
      var reportCollection = new ReportCollection();

      reportCollection.fetch({
        success: function () {
          callback(reportCollection);
        }
      });
    }
  };
});