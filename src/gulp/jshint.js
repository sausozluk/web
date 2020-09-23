const gulp = require("gulp");
const jshint = require("gulp-jshint");

gulp.task("jshint", function () {
  return gulp.src("./app/**/*.js").pipe(jshint(".jshintrc")).pipe(jshint.reporter("default"));
});
