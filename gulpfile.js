var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");

var srcFiles = './es6/**/*.js'
gulp.task('default', function () {
  return gulp.src(srcFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('js'));
});
gulp.task('watch', function(){
  gulp.watch(srcFiles, ['default']);
});
