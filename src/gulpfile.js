var gulp = require('gulp');
var log = require('gulp-util').log;
var fs = require('fs');
var dir = './gulp';

require('dotenv').config();

global.name = process.env['SOZLUK_NAME'] || 'saüsözlük';
global.env = process.env['SOZLUK_ENV'] || 'dev';
global.apiUrl = process.env['SOZLUK_API_URL'] || 'http://localhost:8080/api/v1';

log('SOZLUK_NAME #', name);
log('SOZLUK_ENV #', env);
log('SOZLUK_API_URL #', apiUrl);

fs.readdirSync(dir).map(function (file) {
  require(dir + '/' + file);
});

gulp.task('default', ['watch']);
gulp.task('build', ['cssmin']);