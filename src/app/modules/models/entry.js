define(function (require, exports, module) {
  var BaseModel = require('./base');

  module.exports = BaseModel.extend({
    urlRoot: function () {
      return this.getApiUrl() + '/entries';
    }
  });
});