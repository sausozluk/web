define(function (require, exports, module) {
  var Backbone = require('backbone');
  var utils = require('utils');

  module.exports = Backbone.Collection.extend({
    isMock: false,
    getApiUrl: function () {
      return this.isMock ? module.config().mockUrl : module.config().apiUrl;
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
