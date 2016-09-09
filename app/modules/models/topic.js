define(function (require, exports, module) {
  var BaseModel = require('./base');

  module.exports = BaseModel.extend({
    isMock: true,
    urlRoot: function () {
      return this.getApiUrl() + '/topics';
    }
  });
});