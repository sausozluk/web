define(function (require, exports, module) {
  var BaseCollection = require('./base');

  module.exports = BaseCollection.extend({
    path: '',
    url: function () {
      return this.getApiUrl() + this.path;
    },
    changeUrl: function (path) {
      this.path = path;
    }
  });
});