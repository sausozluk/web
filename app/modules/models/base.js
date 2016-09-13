define(function (require, exports, module) {
  var Backbone = require('backbone');

  module.exports = Backbone.Model.extend({
    getApiUrl: function () {
      return this.isMock ? module.config().mockUrl : module.config().apiUrl;
    },
    parse: function (response, options) {
      if (options.collection) {
        return response;
      } else {
        return response.data;
      }
    },
    up: function (field) {
      this.set(field, this.get(field) + 1);
    },
    down: function (field) {
      this.set(field, this.get(field) - 1);
    }
  });
});
