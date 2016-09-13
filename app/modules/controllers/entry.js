define(function (require, exports, module) {
  var EntryModel = require('../models/entry');
  var AjaxModel = require('../models/ajax');

  module.exports = {
    'newEntry': function (data, callback) {
      var entryModel = new EntryModel();

      entryModel.save(data, {
        success: function (model, response) {
          callback(response);
        }
      });
    },
    getEntryById: function (id, callback) {
      var entryModel = new EntryModel({id: id});

      entryModel.fetch({
        success: function () {
          callback(entryModel);
        }
      });
    },
    'upVote': function (id, callback) {
      var ajaxModel = new AjaxModel();

      ajaxModel.changeUrl('/entry/vote/up');

      ajaxModel.save({id: id}, {
        success: function (model, response) {
          callback(response);
        }
      });
    },
    'downVote': function (id, callback) {
      var ajaxModel = new AjaxModel();

      ajaxModel.changeUrl('/entry/vote/down');

      ajaxModel.save({id: id}, {
        success: function (model, response) {
          callback(response);
        }
      });
    }
  };
});