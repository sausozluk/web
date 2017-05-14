var gulp = require('gulp');
var log = require('gulp-util').log;
var fs = require('fs');
var dir = './gulp';

require('dotenv').config();
var sozluk_env = process.env['SOZLUK_ENV'] || 'local';
global.config = require(__dirname + '/confs/' + sozluk_env);

log('SOZLUK_ENV #', sozluk_env);

fs.readdirSync(dir).map(function (file) {
  require(dir + '/' + file);
});

gulp.task('default', ['watch']);
gulp.task('build', ['cssmin']);