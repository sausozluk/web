define(function (require, exports, module) {
  var BaseModel = require('./base');

  module.exports = BaseModel.extend({
    idAttribute: 'notId',
    path: '',
    urlRoot: function () {
      return this.getApiUrl() + this.path;
    },
    changeUrl: function (path) {
      this.path = path;
    }
  });
});