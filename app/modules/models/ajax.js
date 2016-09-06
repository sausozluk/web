define(function (require, exports, module) {
  var BaseModel = require('./base');

  module.exports = BaseModel.extend({
    path: '',
    urlRoot: function () {
      return this.getApiUrl() + this.path;
    },
    changeUrl: function (path) {
      this.path = path;
    }
  });
});