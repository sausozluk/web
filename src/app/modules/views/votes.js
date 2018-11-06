define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var VotesTemplate = require('template!../../templates/votes');
  var entryController = require('../controllers/entry');
  

  module.exports = Backbone.View.extend({
    events: {},

    setTitleAndDescription: function (text) {
      document.title = '#' + text + ' sevenler - saü sözlük';
      $('[name="description"]').attr('content', '#' + text + ' sevenler');
      $('[name="twitter:title"]').attr('content', '#' + text + ' sevenler - saü sözlük');
      $('[name="twitter:description"]').attr('content', '#' + text + ' sevenler');
    },

    render: function (id) {
      
      entryController.getEntryVotesById(id, (function (entry) {
        $(this.el).html(VotesTemplate({
          id: id,
          votes: entry.up
        }));

        this.setTitleAndDescription(id);
      }).bind(this));
    }
  });
});
