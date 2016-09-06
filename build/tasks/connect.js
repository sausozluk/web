var path = require('path');
var parse = require('url').parse;
var fs = require('fs');

module.exports = function () {
  this.loadNpmTasks('grunt-contrib-connect');
  return this.config('connect', {
    server: {
      options: {
        port: 1337,
        base: 'dist',
        middleware: function (connect, options) {
          return [
            function (req, res) {
              var file, url;
              url = parse(req.url);
              file = url.pathname.split('/').splice(-1)[0];
              if (!path.extname(file)) {
                req.url = '/index.html';
              }

              fs.createReadStream('dist' + req.url).pipe(res);
            }
          ];
        }
      }
    }
  });
};