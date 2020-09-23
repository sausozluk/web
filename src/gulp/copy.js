const gulp = require("gulp");
const {series} = require("gulp");

gulp.task('copy-deps', function () {
  return gulp.src('deps/**').pipe(gulp.dest('dist/deps/'));
});

gulp.task('copy-assets', function () {
  return gulp.src('app/assets/**').pipe(gulp.dest('dist/assets/'));
});

gulp.task('copy-robot', function () {
  return gulp.src('robots.txt').pipe(gulp.dest('dist/'));
});

gulp.task('copy', series('copy-deps', 'copy-assets', 'copy-robot'));