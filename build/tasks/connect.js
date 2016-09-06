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
              var url = parse(req.url);

              if (!fs.existsSync('dist' + url.pathname)) {
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