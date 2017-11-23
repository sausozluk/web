define(function (require, exports, module) {
  var AjaxModel = require('../models/ajax');

  module.exports = {
    'getMostWriterUsers': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/stats/most-writers');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    },
    'getMostUpVotedEntries': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/stats/most-up-voted-entries');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    },
    'getMostUpVotedUsers': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/stats/most-up-voted-users');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    },
    'getNewUsers': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/stats/new-users');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    },
    'getGeneral': function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/stats/general');

      ajaxModel.fetch({
        success: function (model, response) {
          callback(response.data);
        }
      });
    }
  };
});