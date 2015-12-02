var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');


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
  .pipe(gulp.dest('build/'));
});

gulp.task('minify:dev', function() {
  gulp.src('build/bundle.js')
  .pipe(minify())
  .pipe(gulp.dest('build/'));
});

gulp.task('uglify:dev', function() {
  gulp.src('build/bundle.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', ['static:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);

gulp.watch(['**/*', '!build/*'], ['default']);
