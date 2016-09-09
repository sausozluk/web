var parse = require('url').parse;
var fs = require('fs');
var mime = require('mime-types');
var path = require('path');

var mocker = function (urlRoot, pathRoot) {
  pathRoot = pathRoot.replace(urlRoot, '');

  return function (req, res, next) {
    if (req.url.indexOf(urlRoot) === 0) {
      var url = req.url.split('?')[0];

      fs.readFile(
        './' + pathRoot + url + '/' + req.method + '.json',
        function (err, buf) {
          if (err) return next(err);

          var resp = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Content-Length': buf.length},
            body: buf
          };

          res.writeHead(200, resp.headers);
          res.end(resp.body);
        });
    } else {
      next();
    }
  };
};

module.exports = function () {
  this.loadNpmTasks('grunt-contrib-connect');
  return this.config('connect', {
    server: {
      options: {
        port: 1337,
        base: 'dist',
        middleware: function (connect, options) {
          var middlewares = [];

          middlewares.push(mocker("/api", "mock"));

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