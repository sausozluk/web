define(function (require, exports, module) {
  var $ = require('jquery');
  var AjaxModel = require('../models/ajax');

  module.exports = {
    'suggest': function (text, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/search');

      ajaxModel.fetch({
        data: $.param({q: text}),
        success: function (model, response) {
          callback(response.data);
        }
      });
    }
  };
});