var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

var appFiles = ['server.js', __dirname + '/routes/**/*.js', __dirname + '/models/**/*.js', __dirname + '/lib/**/*.js'];
var testFiles = ['gulpfile.js', __dirname + "/test/**/*.js"];

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
