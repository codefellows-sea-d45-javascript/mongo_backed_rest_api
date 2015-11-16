var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var appFiles = ['index.js','models/**/*.js', 'routes/**/*.js', 'gulpfile.js', 'lib/**/*.js'];
var testFiles = ['./test/**/*.js'];

gulp.task('jshint:test', function(){
  return gulp.src(testFiles)
  .pipe(jshint({
    node:true,
    globals: {
      describe: true,
      it: true,
      before: true,
      after: true,
    }
  }))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint:app', function(){
  return gulp.src(appFiles)
  .pipe(jshint({
    node:true
  }))
  .pipe(jshint.reporter('default'));
});

gulp.task('mocha', ['jshint'], function(){
  return gulp.src('./test/test.js', {read:false})
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('default', ['jshint', 'mocha']);
