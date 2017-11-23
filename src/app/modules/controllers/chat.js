define(function (require, exports, module) {
  var ChatCollection = require('../collections/chat');
  var AjaxModel = require('../models/ajax');

  module.exports = {
    'getInbox': function (callback) {
      var chatCollection = new ChatCollection();

      chatCollection.fetch({
        success: function () {
          callback(chatCollection);
        }
      });
    },
    'getChat': function (slug, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl('/chats/' + slug);

      ajaxModel.fetch({
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