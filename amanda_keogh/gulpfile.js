var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');

var appFiles = ['server.js', __dirname + '/routes/**/*.js', __dirname + '/models/**/*.js', __dirname + '/lib/**/*.js'];
var testFiles = ['gulpfile.js', __dirname + "/test/**/*.js"];
var htmlFiles = ['app/**/*.html'];

/* * * * * * * * * * * * * * * * * *
            BUILD TASKS
 * * * * * * * * * * * * * * * * * */

gulp.task('static:dev', function() {
  return gulp.src(htmlFiles)
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('css:dev', function() {
  return gulp.src(['app/css/reset.css', 'app/css/base.css', 'app/css/layout.css', 'app/css/modules.css', 'app/css/state.css'])
    .pipe(concatCss('styles.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('build/'));
})

gulp.task('build:dev', ['static:dev', 'webpack:dev', 'css:dev']);

/* * * * * * * * * * * * * * * * * *
            LINT TASKS
 * * * * * * * * * * * * * * * * * */

gulp.task('jshint:appfiles', function() {
  return gulp.src(appFiles)
    .pipe(jshint({
      node: true,
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:testfiles', function() {
  return gulp.src(testFiles)
    .pipe(jshint({
      node: true,
      globals: {
        before: true,
        after: true,
        it: true,
        expect: true
      }
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint', ['jshint:appfiles', 'jshint:testfiles']);

/* * * * * * * * * * * * * * * * * *
            TEST TASKS
 * * * * * * * * * * * * * * * * * */

gulp.task('mocha', function() {
  return gulp.src(appFiles)
    .pipe(mocha());
})

/* * * * * * * * * * * * * * * * * *
          WATCH TASKS
 * * * * * * * * * * * * * * * * * */

//frontend
gulp.task('buildWatch', function() {
  gulp.watch(htmlFiles, ['static:dev']);
  gulp.watch('app/js/**/*.js', ['build:dev']);
  gulp.watch('app/css/**/*.css', ['css:dev']);
});

// backend
gulp.task('appWatch', function() {
  gulp.watch(appFiles, ['jshint:appfiles', 'mocha']);
  gulp.watch(testFiles, ['jshint:appfiles']);
});

gulp.task('watch', ['buildWatch', 'appWatch']);

/* * * * * * * * * * * * * * * * * *
              DEFAULT
 * * * * * * * * * * * * * * * * * */

gulp.task('default', ['watch']);
