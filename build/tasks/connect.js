var parse = require('url').parse;
var fs = require('fs');
var mime = require('mime-types');
var path = require('path');

module.exports = function () {
  this.loadNpmTasks('grunt-contrib-connect');
  return this.config('connect', {
    server: {
      options: {
        port: 1337,
        base: 'dist',
        middleware: function (connect, options) {
          var middlewares = [];

          middlewares.push(function (req, res) {
            var url = parse(req.url);
            var target = 'dist' + url.pathname;

            try {
              fs.statSync(target);
              if (target.slice(-1) === "/") {
                fs.createReadStream('dist/index.html').pipe(res);
              } else {
                var contentType = mime.contentType(path.extname(target));
                res.setHeader('content-type', contentType);
                fs.createReadStream(target).pipe(res);
              }
            } catch (e) {
              fs.createReadStream('dist/index.html').pipe(res);
            }
          });

          return middlewares;
        }
      }
    }
  });
};