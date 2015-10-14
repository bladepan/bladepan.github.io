'use strict';

var gulp = require('gulp');
var serve = require('gulp-serve');

var ts = require('gulp-typescript');

var tsFiles = 'src/app/**/*.ts';

gulp.task('serve', serve('.')); 
gulp.task('scripts', function () {
  return gulp.src(tsFiles)
    .pipe(ts({
      noImplicitAny: true,
      outDir: 'js'
    })).pipe(gulp.dest('js'));
});


gulp.task('watch', ['scripts'], function() {
    gulp.watch(tsFiles, ['scripts']);
});

gulp.task('default', ['watch']);