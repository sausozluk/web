var gulp = require('gulp');
var processhtml = require('gulp-processhtml');

gulp.task('processhtml', ['jshint'], function () {
  return gulp.src('index.html')
    .pipe(processhtml({
      data: {
        apiUrl: apiUrl,
        name: name
      }
    }))
    .pipe(gulp.dest('dist/'));
});