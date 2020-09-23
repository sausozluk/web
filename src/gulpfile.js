const gulp = require("gulp");
const {series, parallel} = require("gulp");
const fs = require("fs");
const dir = "./gulp";

require("dotenv").config();
global.sozluk_env = process.env.SOZLUK_ENV || "local";
global.config = require(__dirname + "/confs/" + global.sozluk_env);

console.log("SOZLUK_ENV #", global.sozluk_env);

fs.readdirSync(dir).map(function (file) {
  require(dir + "/" + file);
});

var js = series("jshint", "copy-deps", "requirejs");
var css = series("styles", "cssmin");

gulp.task("build", series(
  "clean",
  parallel(
    js,
    css,
    "processhtml",
    "copy-assets",
    "copy-robot"
  )
));

gulp.task("default", series(
  "clean",
  parallel(
    js,
    css,
    "processhtml",
    "copy-assets",
    "copy-robot"
  ),
  "connect",
  "watch"
));