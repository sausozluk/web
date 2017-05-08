define(function (require, exports, module) {
  var BaseCollection = require('./base');
  var RandomModel = require('../models/random');

  module.exports = BaseCollection.extend({
    url: function () {
      return this.getApiUrl() + '/topics/i/random';
    },
    model: RandomModel,
    parse: function (collection) {
      return collection.data;
    }
  });
});