const gulp = require("gulp");
const processhtml = require("gulp-processhtml");

gulp.task("processhtml", function () {
  return gulp.src("index.html")
    .pipe(processhtml({
      data: {
        apiUrl: config.api_url,
        name: config.name,
        env: sozluk_env
      }
    }))
    .pipe(gulp.dest("dist/"));
});