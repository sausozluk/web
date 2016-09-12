define(function (require, exports, module) {
  var EntryModel = require('../models/entry');

  module.exports = {
    'newEntry': function (data, callback) {
      var entryModel = new EntryModel();

      entryModel.save(data, {
        success: function (model, response) {
          callback(response);
        }
      });
    }
  };
});