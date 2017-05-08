var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

gulp.task('styles', ['requirejs'], function () {
  return gulp.src('app/styles/*')
    .pipe(concatCss("styles.css"))
    .pipe(gulp.dest('dist/'));
});