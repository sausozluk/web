define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var GitHubCollection = Backbone.Collection.extend({});

  module.exports = {
    'getWebCommits': function (a, b) {
      var callback = !b ? a : b;
      var page = !b ? 1 : a;

      $.ajax({
        url: 'https://api.github.com/repos/sausozluk/web/commits',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: $.param({page: page}),
        success: function (response) {
          callback(new GitHubCollection(response.data));
        }
      });
    },
    'getApiCommits': function (a, b) {
      var callback = !b ? a : b;
      var page = !b ? 1 : a;

      $.ajax({
        url: 'https://api.github.com/repos/sausozluk/api/commits',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: $.param({page: page}),
        success: function (response) {
          callback(new GitHubCollection(response.data));
        }
      });
    }
  };
});