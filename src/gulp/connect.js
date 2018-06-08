var gulp = require('gulp');
var connect = require('gulp-connect');
var history = require('connect-history-api-fallback');
var compression = require('compression');

var cache = function (req, res, next) {
  // 1 month
  res['setHeader']('Expires', new Date(Date.now() + 2592000000).toUTCString());
  next();
};

gulp.task('connect', function () {
  return connect.server({
      port: 1337,
      root: 'dist',
      host: '0.0.0.0',
      middleware: function (connect, options) {
        return [cache, compression(), history({
          rewrites: [
            {from: /^\/q\/.*$/, to: '/index.html'},
            {from: /^\/biri\/.*$/, to: '/index.html'},
            {from: /^\/mesaj\/.*$/, to: '/index.html'}
          ]
        })];
      }
    }
  );
});