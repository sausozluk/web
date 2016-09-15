define(function (require, exports, module) {
  var BaseModel = require('./base');
  var EntryModel = require('../models/entry');
  var TopicModel = require('../models/topic');
  var _ = require('underscore');

  module.exports = BaseModel.extend({
    initialize: function () {
      _.defaults(this, {
        topic: new TopicModel(),
        entry: new EntryModel()
      });
    },
    urlRoot: function () {
      return this.getApiUrl() + '/topics/i/random';
    },
    parse: function (model, options) {
      model = options.collection ? model : model.data;

      if (_.has(model, 'entry')) {
        this.entry = new EntryModel(model.entry);

        delete model.entry;
      }

      if (_.has(model, 'topic')) {
        this.topic = new TopicModel(model.topic);

        delete model.topic;
      }

      return model;
    }
  });
});