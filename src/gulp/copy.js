var gulp = require('gulp');
var merge = require('merge-stream');

gulp.task('copy', ['processhtml'], function () {
  var dist = gulp.src('deps/**').pipe(gulp.dest('dist/deps/'));
  var assets = gulp.src('app/assets/**').pipe(gulp.dest('dist/assets/'));
  var robot = gulp.src('robots.txt').pipe(gulp.dest('dist/'));
  var favicon = gulp.src('favicon.ico').pipe(gulp.dest('dist/'));

  return merge(dist, assets, robot, favicon);
});