"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var jshintAppFiles = ['server.js', 'lib/**/*.js', 'bin/**/*.js'];
var testFiles = ['./test/**/*.js'];
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var gulpWatch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('static:dev', function(){
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function(){
  gulp.src('app/js/entry.js')
  .pipe(webpack({
    output:{
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('mocha:test', function(){
  return gulp.src(testFiles)
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jshint:test', function(){
  return gulp.src(testFiles)
  .pipe(jshint({
    node: true,
    globals: {
      describe: true,
      it: true,
      before: true,
      after: true
    }
  }))
  .pipe(jshint.reporter('default'));
});

gulp.task('jshint:app', function(){
  return gulp.src(jshintAppFiles)
  .pipe(jshint({}))
  .pipe(jshint.reporter('default'));
});

gulp.task('webpack:test', function(){
  return gulp.src('test/client/test_entry.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/client/'));
});

gulp.task('sass:dev', function () {
 gulp.src('./app/sass/core.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest('build/'));
});


gulp.task('sass:watch', function(){
  gulp.watch('./app/sass/**/*.scss', ['sass:dev']);
});



gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('mocha', ['mocha:test']);
gulp.task('build', ['webpack:dev', 'static:dev', 'sass:dev']);
