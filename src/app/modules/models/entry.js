define(function (require, exports, module) {
  var BaseModel = require('./base');

  module.exports = BaseModel.extend({
    urlRoot: function () {
      return this.getApiUrl() + '/entries';
    },
    up: function (field) {
      this.set(field, this.get(field) + 1);
    },
    down: function (field) {
      this.set(field, this.get(field) - 1);
    }
  });
});