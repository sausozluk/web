var gulp = require('gulp');
var rjs = require('gulp-rjs2');

gulp.task('requirejs', function () {
  return rjs({
    mainConfigFile: "app/config.js",
    generateSourceMaps: false,
    include: ["config", "main"],
    out: "source.min.js",
    optimize: "uglify2",
    baseUrl: "app",
    paths: {
      "almond": "../deps/almond/almond"
    },
    name: "almond",
    wrap: true,
    preserveLicenseComments: false
  }).pipe(gulp.dest('dist/'));
});