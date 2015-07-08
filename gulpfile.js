'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var paths = {
  clientScripts: [
    './client/app/**/*.js'
  ],
  serverScripts: [
    './server/**/*.js'
  ],
  allScripts: [
    './server/**/*.js', 
    './client/**/*.js', 
    '!./client/lib/**/*.js', 
    'gulpfile.js', 
    'app.js'
  ],
  styleSheets: [
    './client/lib/**/*.css', 
    './client/assets/css/*.css'
  ]
};

gulp.task('test', function(){
  return gulp.src(paths.allScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(mocha({reporter: 'nyan'}))
      .once('error', function() {
        process.exit(1);
      })
      .once('end', function(){
        process.exit();
      });
});
gulp.task('test:client', function() {
  return gulp.src(paths.clientScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(mocha({reporter: 'nyan'}))
      .once('error', function() {
        process.exit(1);
      })
      .once('end', function(){
        process.exit();
      });
});
gulp.task('test:server', function() {
  return gulp.src(paths.serverScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(mocha({reporter: 'nyan'}))
      .once('error', function() {
        process.exit(1);
      })
      .once('end', function(){
        process.exit();
      });
});
gulp.task('scripts', function(){
  var b = browserify({
    entries: './client/app/entry.js',
    debug: true
  });
  return b.bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/dist/'));
});

gulp.task('stylesheets', function(){
  return gulp.src(paths.styleSheets)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./client/dist'))
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('dev', function(){
  nodemon({
    script: './app.js', // subject to change
    ext: 'js css',
    tasks: ['scripts', 'styleSheets']
  }).on('restart', function(){
    console.log('server restarted...');
  });
});

gulp.task('deploy', function(){

});

gulp.task('watch', function(){
  gulp.watch(paths.clientScripts, ['scripts']);
  gulp.watch(paths.styleSheets, ['styleSheets']);
});

gulp.task('default', ['test', 'scripts', 'stylesheets', 'dev']);

