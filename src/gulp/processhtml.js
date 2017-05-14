var gulp = require('gulp');
var processhtml = require('gulp-processhtml');

gulp.task('processhtml', ['jshint'], function () {
  return gulp.src('index.html')
    .pipe(processhtml({
      data: {
        apiUrl: config['api_url'],
        name: config['name']
      }
    }))
    .pipe(gulp.dest('dist/'));
});