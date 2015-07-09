'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var mochaPhantomjs = require('gulp-mocha-phantomjs');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');

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
    './test/**/*.js',
    '!./client/lib/**/*.js', 
    '!./client/dist/**/*.js', 
    'gulpfile.js', 
    'app.js'
  ],
  styleSheets: [
    './client/lib/**/*.css', 
    './client/assets/css/*.css'
  ]
};

gulp.task('lint', function() {
  return gulp.src(paths.allScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test:client', function() {
  return gulp.src('test/client/Runner.html')
    .pipe(mochaPhantomjs({reporter: 'spec'}))
      .on('error', gutil.log)
      .once('end', function(){
        console.log('client tests ended');
      });
});

gulp.task('test:server', function() {
  return gulp.src(paths.serverScripts)
    .pipe(mocha({reporter: 'nyan'}))
      .on('error', gutil.log)
      .once('end', function(){
        process.exit();
      });
});

gulp.task('test', ['lint', 'test:client'], function() {
  gulp.start('test:server');
});

// function scripts(watch) {
//   var bundler, rebundle, production;
//   bundler = browserify('./client/app/entry.js', {
//     basedir: __dirname,
//     debug: !production,
//     cache: {},
//     packageCache: {},
//     fullPaths: watch
//   });
//   if (watch) {
//     bundler = watchify(bundler);
//   }
//   rebundle = function() {
//     var stream = bundler.bundle();
//     stream.on('error', gutil.log);
//     stream = stream.pipe(source('main.min.js'))
//     return stream.pipe(gulp.dest('./client/dist/'));
//   };
//   bundler.on('update', rebundle);
//   return rebundle();
// }
gulp.task('scripts', function(){
  var b = browserify({
    entries: './client/app/entry.js',
    insertGlobals: true,
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
    script: './app.js', 
    ext: 'js css html handlebars',
  }).on('restart', function(){
    console.log('server restarted...');
  });
});

gulp.task('deploy', function(){

});

gulp.task('watch', function(){
  gulp.watch(['./test/**/*.js'], ['test']);
  gulp.watch(paths.clientScripts, ['scripts']);
  gulp.watch(paths.styleSheets, ['stylesheets']);
});

gulp.task('default', ['scripts', 'stylesheets', 'watch'], function() {
  gulp.start('dev');
});

