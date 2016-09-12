define(function (require, exports, module) {
  var BaseModel = require('./base');
  var EntryCollection = require('../collections/entry');
  var _ = require('underscore');

  module.exports = BaseModel.extend({
    initialize: function () {
      _.defaults(this, {
        entries: new EntryCollection()
      });
    },
    urlRoot: function () {
      return this.getApiUrl() + '/topics';
    },
    parse: function (model, options) {
      model = options.collection ? model : model.data;

      if (_.has(model, 'entries')) {
        this.entries = new EntryCollection(model.entries);

        delete model.entries;
      }

      return model;
    }
  });
});