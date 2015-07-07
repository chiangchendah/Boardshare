(function(){
  'use strict';

  var gulp = require('gulp');
  var browserify = require('gulp-browserify');
  var jshint = require('gulp-jshint');
  var mocha = require('gulp-mocha');
  var nodemon = require('gulp-nodemon');

  var paths = {
    clientScripts: ['./client/**/*.js'],
    serverScripts: ['./server/**/*.js'],
    allScripts: ['./server/**/*.js', './client/**/*.js', '!./client/lib/**/*.js', 'gulpfile.js'],
    styleSheets: ['./client/lib/**/*.css', '.client/assets/**/*.css']
  };

  gulp.task('test', function(){
    return gulp.src(paths.allScripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(mocha({reporter: 'nyan'}));
  });

  // TODO: test:client
  // TODO: test:server

  gulp.task('scripts', function(){
    // concats & minify
  });

  gulp.task('styleSheets', function(){
    // concats & minify
  });

  gulp.task('dev', function(){
    nodemon({
      script: './app.js', // subject to change
      ext: 'js css html',
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

  gulp.task('default', ['test', 'scripts', 'styleSheets', 'dev']);
})();
