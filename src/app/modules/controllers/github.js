define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var GitHubCollection = Backbone.Collection.extend({});
  var utils = require('utils');
  var moment = require('moment');
  var notification = require('notification');

  var doMomentForMeta = function (meta) {
    return moment(parseInt(meta['X-RateLimit-Reset']) * 1000).fromNow();
  };

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
          if (!parseInt(response.meta['X-RateLimit-Remaining'])) {
            notification.error('web # ' + doMomentForMeta(response.meta));
          } else {
            callback(new GitHubCollection(response.data));
          }
        }
      });
    },
    'getApiCommits': function (a, b) {
      var callback = !b ? a : b;
      var page = !b ? 1 : a;

      $.ajax({
        url: 'https://api.github.com/repos/sausozluk/back/commits',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: $.param({page: page}),
        success: function (response) {
          if (!parseInt(response.meta['X-RateLimit-Remaining'])) {
            notification.error('api # ' + doMomentForMeta(response.meta));
          } else {
            callback(new GitHubCollection(response.data));
          }
        }
      });
    }
  };
});
