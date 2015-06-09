var gulp = require('gulp'),
  electron = require('gulp-electron')
  coffee = require('gulp-coffee')
  jade = require('gulp-jade')
  packageJson = require('./src/app/package.json');

gulp.task('coffee', function(){
  gulp.src("./src/coffee/**/*.coffee")
  .pipe(coffee())
  .pipe(gulp.dest("src/app"))
});

gulp.task('jade', function(){
  gulp.src("./src/jade/**/*.jade")
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest("src/app"))
});

gulp.task('electron', function(){
  gulp.src("")
  .pipe(electron({
      src: './src/app',
      packageJson: packageJson,
      release: './release',
      cache: './cache',
      version: 'v0.24.0',
      rebuild: false,
      platforms: ['win32-ia32', 'darwin-x64', 'linux-x64']
  }))
  .pipe(gulp.dest(""));
});
/*
gulp.task('default', [
  'develop'
]);
*/
gulp.task('build', ['jade', 'coffee']);//, 'electron']);
gulp.task('default', [
  'build'
]);
gulp.task('make', ['build', 'electron']);
