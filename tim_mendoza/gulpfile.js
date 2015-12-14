var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var cssConcat = require('gulp-concat-css');
var cssMinify = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');


gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function() {
  gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(uglify())
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

gulp.task('css:dev', function() {
  gulp.src('./app/scss/application.scss')
  .pipe(sourceMaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(cssMinify())
  .pipe(sourceMaps.write('./'))
  .pipe(gulp.dest('build/'));
});

gulp.task('uglify:dev', function() {
  gulp.src('build/bundle.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', ['static:dev', 'webpack:dev', 'css:dev']);
gulp.task('default', ['build:dev']);

gulp.watch(['test/client/movies_controller_test.js'], ['webpack:test']);

gulp.watch(['app/scss/**/*.scss'], ['css:dev']);
gulp.watch(['app/**/*.html'], ['static:dev']);
gulp.watch(['app/**/*.js'], ['webpack:dev']);
