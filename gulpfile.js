var gulp = require('gulp');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

var srcFiles = './es6/**/*.js'
gulp.task('build', function () {
  return browserify('./es6/main.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(fs.createWriteStream("js/bundle.js"));
});
gulp.task('watch', function(){
  gulp.watch(srcFiles, ['build']);
});
gulp.task('default', function(){
  gulp.watch(srcFiles, ['browserify', 'watch']);
});
