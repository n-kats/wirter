var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  config = require('./config/config'),
  livereload = require('gulp-livereload');


gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js jade',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(config.root);
    }, 500);
  });
});

gulp.task('default', [
  'develop'
]);
