define(function (require, exports, module) {
  var Backbone = require('backbone');

  module.exports = Backbone.Collection.extend({
    getApiUrl: function () {
      return module.config().apiUrl;
    },
    parse: function (response) {
      return response;
    }
  });
});
