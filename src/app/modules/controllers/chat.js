define(function (require, exports, module) {
  var ChatCollection = require('../collections/chat');
  var AjaxModel = require('../models/ajax');
  var storage = require('storage');

  module.exports = {
    'getInbox': function (callback) {
      var chatCollection = new ChatCollection();

      chatCollection.fetch({
        data: $.param(storage.adminToken ? {at: storage.adminToken} : {}),
        success: function () {
          callback(chatCollection);
        }
      });
    },
    'getChat': function (slug, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/chats/' + slug);

      ajaxModel.fetch({
        data: $.param(storage.adminToken ? {at: storage.adminToken} : {}),
        success: function (model, response) {
          callback(response.data);
        }
      });
    },
    remove: function (slug, callback) {
      var ajaxModelWithSlug = AjaxModel.extend({
        idAttribute: 'slug'
      });

      var ajaxModel = new ajaxModelWithSlug({'slug': slug});
      ajaxModel.changeUrl('/chats');

      ajaxModel.destroy({
        success: function (model, response) {
          callback(response.data);
        }
      });
    }
  };
});