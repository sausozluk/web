define(function (require, exports, module) {
  var BaseCollection = require('./base');
  var ReportModel = require('../models/report');

  module.exports = BaseCollection.extend({
    url: function () {
      return this.getApiUrl() + '/reports';
    },
    model: ReportModel
  });
});