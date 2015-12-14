var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var gulpWatch = require('gulp-watch');

gulp.task('default', ['jshint', 'test']);

gulp.task('jshint', function(){
  gulp.src(['gulpfile.js', 'lib/*.js', 'test/*.js', 'server.js', 'models/*.js', 'routes/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint'], function(){
  gulp.src(['test/**/*.js'])
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('css:dev', function() {
  return gulp.src([
    'app/css/base.css',
    'app/css/layout.css',
    'app/css/module.css'
    ])
    .pipe(concatCss('styles.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch('./app/**', ['default']);
});

gulp.task('webpack:dev', function() {
  gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client/test_entry.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/client/'));
});


gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['build:dev']);
