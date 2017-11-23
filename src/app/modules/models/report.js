define(function (require, exports, module) {
  var BaseModel = require('./base');

  module.exports = BaseModel.extend({
    idAttribute: '_id',
    urlRoot: function () {
      return this.getApiUrl() + '/reports';
    },
    defaults: {
      'user': {}
    }
  });
});