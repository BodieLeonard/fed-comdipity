/*
  Gulpjs is the task manager
  To run gulp go to this gulpfile.js location within terminal and run the command gulp
  Running the command gulp will start the 'default' task 
  Gulp is responsible for all builds. All the files in the /scripts director will be moved into the www director when gulp is ran
*/

// gulp dependencies
var gulp = require('gulp')
    , jshint = require('gulp-jshint')
    , sass = require('gulp-sass')
    , compass = require('gulp-compass')
    , notify = require('gulp-notify')
    , minifyHTML = require('gulp-minify-html')
    , concat = require('gulp-concat')
    , stripDebug = require('gulp-strip-debug')
    , uglify = require('gulp-uglify')
    , fileinclude = require('gulp-file-include')
    , prefix = require('gulp-autoprefixer');

// directory constants
var www = "./www/"
    , srcScripts = "./app/scripts/"
    , srcTemplates = "./app/templates/"
    , srcLibs = "./app/libs/"
    , srcComponents = "./app/components/"
    , srcSass = "./sass/";


// Gulp default run and watch command
gulp.task('default', function() {
  gulp.run('build');
  gulp.watch([
        srcSass+'*.scss'
      , srcScripts+'*.js'
      , srcComponents+'*.html'
      , srcTemplates+'*.html'
      , './app/*.js'
      , '!dist/**'
  ], function(event) {
      gulp.run('build');
  })
});

// Gulp commands to be ran when a change in the default task is found
gulp.task('build', function(){
  gulp.run('fileinclude');
  gulp.run('sass');
  gulp.run('loader');
  gulp.run('app');
  gulp.run('main');

});

// Compile sass and compass then output into the css dir
/*gulp.task('sass', function() {
  return gulp.src(srcSass+'*.scss')
      .pipe(compass({
          config_file: srcSass+'config.rb'
        , css: 'stylesheets'
        , sass: 'sass'
      }))
      .pipe(gulp.dest(www+"css"))
      .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
});*/

gulp.task('sass', function() {
    return gulp.src(srcSass+'*.scss')
        .pipe(compass({
            config_file: srcSass+'config.rb'
          , css: 'css'
          , sass: 'sass'
        }))
        //.pipe(minifyCSS())
        .pipe(gulp.dest(www+"css"));
});


// When debugging javascript jshint will display errors
gulp.task('jshint', function() {
  return gulp.src(srcScripts+'scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('main', function() {
  return gulp.src([
    "./app/main.js",
    ])
    .pipe(concat(www+'js/main.min.js'))
    .pipe(stripDebug())
    //.pipe(uglify())
    .pipe(gulp.dest('./'));
});

// JS concat, strip debugging and minify
gulp.task('loader', function() {
  return gulp.src([
    srcLibs+"headjs/loader.js",
    ])
    .pipe(concat(www+'js/loader.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

// JS concat, strip debugging and minify
gulp.task('app', function() {
  return gulp.src([
    srcScripts+"*.js"
    ])
    .pipe(concat(www+'js/app.min.js'))
    //.pipe(stripDebug())
    //.pipe(uglify())
    .pipe(gulp.dest('./'));
});


// All libraries should be placed here and minified for production
gulp.task('libs', function() {
  return gulp.src([
      srcLibs+"jquery/1.11.0/jquery.js"
    , srcLibs+"handlebars/1.0/handlebars.js"
    , srcLibs+"fastclick/fastclick.js"
    , srcLibs+"modernizr/2.6.2/modernizr.js"
    , srcLibs+"moment/moment.min.js"
    ])
    .pipe(concat(www+'js/libs.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});


// find html templates and place therm into html pages with this task
gulp.task('fileinclude', ['build'], function () {

  var opts = {comments:false,spare:true};

    gulp.src([ srcTemplates+"*.html" ])
    .pipe(fileinclude())
    //.pipe(minifyHTML(opts))
    .pipe(gulp.dest(www));
    
});


