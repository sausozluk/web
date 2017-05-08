define(function (require, exports, module) {
  var BaseCollection = require('./base');
  var EntryModel = require('../models/entry');

  module.exports = BaseCollection.extend({
    url: function () {
      return this.getApiUrl() + '/entries';
    },
    model: EntryModel
  });
});