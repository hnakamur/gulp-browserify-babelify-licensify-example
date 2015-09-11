/**
 * This gulpfile.js is based on https://gist.github.com/rootical/d700ea0d89bbfc362fc5
 * Thanks!
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var watchify = require('watchify');
var browserify = require("browserify");
var licensify = require('licensify');
var babelify = require("babelify");
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var path = require('path');
var _ = require('lodash');

var config = {
  srcFile: './src/es6/main.js',
  destDir: 'js',
  destFile: 'bundle.js'
};

gulp.task('build', function () {
  bundle(false, false);
});
gulp.task('watch', function(){
  bundle(true, true);
});

function bundle(watch, debug) {
  var bro;

  if (watch) {
    bro = watchify(browserify(config.srcFile,
      // Assigning debug to have sourcemaps
      _.assign(watchify.args, {
        debug: debug
      })
    ));
    bro.on('update', function() {
      gutil.log('watchify runs build');
      rebundle(bro);
    });
  } else {
    bro = browserify(config.srcFile, {
      debug: debug
    });
  }

  bro.transform(babelify.configure({
    compact: false
  }));

  if (!debug) {
    bro.transform({
      global: true
    }, 'uglifyify');

    bro.plugin(licensify);
  }

  function rebundle(bundler) {
    bundler = bundler.bundle()
      .on('error', function(e) {
        gutil.log('Browserify Error', e);
      })
      .pipe(source(path.basename(config.srcFile)))
      .pipe(buffer())
      .pipe(rename(config.destFile));

    if (debug) {
      bundler = bundler
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write());
    }

    return bundler
      .pipe(gulp.dest(config.destDir))
      .pipe(gulpif(watch,
        browserSync.reload({
          stream: true,
          once: true
        })
      ));
  }

  return rebundle(bro);
}
