var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');

var appFiles = ['server.js', __dirname + '/routes/**/*.js', __dirname + '/models/**/*.js', __dirname + '/lib/**/*.js'];
var testFiles = ['gulpfile.js', __dirname + "/test/**/*.js"];

gulp.task('static:dev', function() {
  return gulp.src('app/**/*.html')
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

gulp.task('build:dev', ['static:dev', 'webpack:dev']);

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

gulp.task('mocha', function() {
  return gulp.src(appFiles)
    .pipe(mocha());
})

gulp.task('watch', function() {
  gulp.watch(appFiles, ['jshint:appfiles', 'mocha']);
  gulp.watch(testFiles, ['jshint:appfiles']);
})

gulp.task('default', ['watch']);
