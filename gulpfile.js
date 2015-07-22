var browserify = require('browserify');
var watchify = require('watchify');
var lodash = require('lodash');
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
var gulpDoxx = require('gulp-doxx');
var path = require('path');

var paths = {
  /**
   * anything you do or don't want documented by doxx
   * add files as you document them so we don't generate a bunch of crap for no
   * reason
   */
  doxx: [
    './client/app/peer/remote*.js',
    './client/app/peer/peerHelpers.js',
    './client/app/helpers/saveBoard.js',
    './client/app/canvas/canvasHelpers/*.js',
    '!./client/app/canvas/canvasHelpers/getSelectors.js',
    '!./client/app/entry.js',
    './server/utils/**/*.js',
    './README.md'
  ],
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
    '!./test/client/mainSpec.js',
    '!./client/lib/**/*.js',
    '!./client/dist/**/*.js',
    '!./client/assets/js/**/*.js',
    'gulpfile.js',
    'app.js'
  ],
  styleSheets: [
    // './client/lib/**/*.css',
    './client/lib/normalize.css/normalize.css',
    './client/lib/fontawesome/css/font-awesome.css',
    './client/lib/spectrum/spectrum.css',
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
        process.exit(0);
      });
});

gulp.task('test', ['lint', 'test:client'], function() {
  gulp.start('test:server');
});

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write()) // writes .map file
    .pipe(gulp.dest('./client/dist/js/'));
}

function bundleProduction() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./client/dist/js/'));
}
function bundleTest() {
  return bTest.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('mainSpec.js'))
    .pipe(gulp.dest('./test/client/'));
}

// add custom browserify options here
var customOpts = {
  entries: ['./client/app/entry.js'],
  debug: true
};
var customOptsTest = {
  entries: ['./client/app/entry.js', './test/client/entrySpec.js'],
  debug: true
};
var opts = lodash.assign({}, watchify.args, customOpts);
var optsTest = lodash.assign({}, watchify.args, customOptsTest);
var b = watchify(browserify(opts));
var bTest = watchify(browserify(optsTest));
// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run gulpjs to build on the file
gulp.task('js-test', bundleTest);
gulp.task('js-deploy', bundleProduction);

b.on('update', bundle); // on any update, runs bundler
b.on('log', gutil.log);

//'./client/app/peer/remotePeer.js'
gulp.task('docs', function () {
  gulp.src(paths.doxx)
    .pipe(gulpDoxx({
      title: 'BoardShare',
      urlPrefix: 'http://boardshare.github.io/boardshare-docs'
    }))
    .pipe(gulp.dest('./doc'));
});

gulp.task('imgs', function() {
  return gulp.src('./client/assets/img/**/*.svg')
    .pipe(gulp.dest('./client/dist/img/'));
});

gulp.task('stylesheets', function(){
  return gulp.src(paths.styleSheets)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./client/dist/css/'))
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./client/dist/css/'));
});

gulp.task('fonts', function() {
  return gulp.src(['./client/lib/fontawesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest('./client/dist/fonts/'));
});

gulp.task('dev', function(){
  nodemon({
    script: './app.js',
    ext: 'js css html handlebars',
  }).on('restart', function(){
    console.log('server restarted...');
  });
});

gulp.task('deploy', ['js-deploy', 'stylesheets', 'fonts', 'imgs'], function(){
  process.exit(0);
});

gulp.task('watch', function(){
  gulp.watch(['./test/**/*.js', '!./test/client/mainSpec.js'], ['js-test']);
  gulp.watch(paths.clientScripts, ['js']);
  gulp.watch(paths.styleSheets, ['stylesheets']);
});

gulp.task('default', ['js', 'stylesheets', 'imgs', 'watch'], function() {
  gulp.start('dev');
});
