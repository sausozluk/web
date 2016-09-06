var parse = require('url').parse;
var fs = require('fs');
var proxy = require('proxy-middleware');
var url = require('url');

module.exports = function () {
  this.loadNpmTasks('grunt-contrib-connect');
  return this.config('connect', {
    server: {
      options: {
        port: 1337,
        base: 'dist',
        middleware: function (connect, options) {
          var middlewares = [];

          var proxyOptions = url.parse('https://api.sausozluk.org/');
          proxyOptions.route = '/api';
          middlewares.push(proxy(proxyOptions));

          middlewares.push(function (req, res) {
            var url = parse(req.url);
            var target = 'dist' + url.pathname;

            try {
              fs.statSync(target);
              if (target.slice(-1) === "/") {
                fs.createReadStream('dist/index.html').pipe(res);
              } else {
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