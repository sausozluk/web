var gulp = require('gulp');

gulp.task('watch', ['connect'], function () {
  gulp.watch('app/**/*', ['cssmin']);
});