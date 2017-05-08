define(function (require, exports, module) {
  var Backbone = require('backbone');
  var utils = require('utils');

  module.exports = Backbone.Collection.extend({
    getApiUrl: function () {
      return window.apiUrl;
    },
    parse: function (response) {
      return response.data;
    },
    fetch: function (options) {
      options = utils.tokenCollectionSync(options);

      return Backbone.Collection.prototype.fetch.call(this, options);
    }
  });
});
