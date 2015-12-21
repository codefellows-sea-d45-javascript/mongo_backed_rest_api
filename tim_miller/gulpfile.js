var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var gulpWatch = require('gulp-watch');
var sass = require('gulp-sass');
var concatCSS = require('gulp-concat-css');
var maps = require('gulp-sourcemaps');

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

gulp.task('sass:dev', function() {
    gulp.src('./app/sass/**/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('build/'));
});

gulp.task('css:dev', function() {
  return gulp.src([
    'app/css/base.css',
    'app/css/skeleton.css'])
  .pipe(concatCSS('styles.min.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*', ['styles']);
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

gulp.task('styles', ['sass:dev', 'css:dev']);
gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['build:dev', 'jshint', 'test', 'styles']);
