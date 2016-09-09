var parse = require('url').parse;
var fs = require('fs');
var mime = require('mime-types');
var path = require('path');
var compression = require('compression');

var mocker = function (urlRoot, pathRoot) {
  pathRoot = pathRoot.replace(urlRoot, '');

  return function (req, res, next) {
    if (req.url.indexOf(urlRoot) === 0) {
      var url = req.url.split('?')[0];
      var target = './' + pathRoot + url + '/' + req.method + '.json';
      try {
        fs.statSync(target);
        fs.readFile(target, function (err, buf) {
          if (err) return next(err);

          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': buf.length
          });

          res.end(buf);
        });
      } catch (e) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });

        res.end(JSON.stringify({
          success: false,
          message: "yok ki"
        }));
      }
    } else {
      next();
    }
  };
};

var pushState = function (req, res) {
  var url = parse(req.url);
  var target = 'dist' + url.pathname;

  try {
    fs.statSync(target);
    if (target.slice(-1) === "/") {
      fs.createReadStream('dist/index.html').pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": mime.contentType(path.extname(target))
      });

      fs.createReadStream(target).pipe(res);
    }
  } catch (e) {
    fs.createReadStream('dist/index.html').pipe(res);
  }
};

module.exports = function () {
  this.loadNpmTasks('grunt-contrib-connect');
  return this.config('connect', {
    server: {
      options: {
        port: 1337,
        base: 'dist',
        middleware: function (connect, options) {
          return [
            compression(),
            mocker("/fake-api", "mock"),
            pushState
          ];
        }
      }
    }
  });
};