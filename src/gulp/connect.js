var gulp = require('gulp');
var connect = require('gulp-connect');

var compression = require('compression');
var path = require('path');
var url = require('url');

var pushState = function (root) {
  root = root || '/';

  return function pushState(req, res, next) {
    var pathname = url.parse(req.url).pathname;
    if (!path.extname(pathname)) {
      req.url = root;
    }
    next();
  };
};

gulp.task('connect', ['cssmin'], function () {
  return connect.server({
      port: 1337,
      root: 'dist',
      middleware: function (connect, options) {
        var middlewares = [];
        middlewares.unshift(pushState());
        middlewares.unshift(compression());
        middlewares.unshift(function (req, res, next) {
          // 1 month
          res['setHeader']('Expires', new Date(Date.now() + 2592000000).toUTCString());
          next();
        });
        return middlewares;
      }
    }
  );
});