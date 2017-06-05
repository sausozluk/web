var gulp = require('gulp');
var $ = require('gulp-sync')(gulp);
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

var js = ['jshint', 'copy-deps', 'requirejs'];
var css = ['styles', 'cssmin'];

gulp.task('build', $.sync([
  'clean',
  [
    js,
    css,
    'processhtml',
    'copy-assets',
    'copy-robot',
    'copy-favicon'
  ]
]));

gulp.task('default', $.sync([
  'clean',
  [
    js,
    css,
    'processhtml',
    'copy-assets',
    'copy-robot',
    'copy-favicon'
  ],
  'connect',
  'watch'
]));