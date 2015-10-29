'use strict';

// Incluimos gulp
var gulp = require('gulp');

// incluimos plug-ins
// verificar calidad de los javascript
var jshint = require('gulp-jshint');

// Para cambios y para minimizar las imágenes
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

// para minificar el html
var minifyHTML = require('gulp-minify-html');

// para minificar el css
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');


// concatenar, quitar console.log y etc
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// the watcher
var watcher = require('gulp-watch');

// livereload
var livereload = require('gulp-livereload');

/**
 * Diretory structure
 */

var sourceDir = './src/',
    destinyDir = './dist/',
    jscriptsDir = 'js/*.js',
    jscriptsDirDest = 'js/',
    stylesDir = 'css/*.css',
    stylesDirDest = 'css/',
    imgDir = 'img/**/*',
    imgDirDest = 'img/',
    sassDir = 'sass/';

var jsFile = 'main.js',
    cssFile = 'main.css';


gulp.task('lint', function() {
  gulp.src(sourceDir + jscriptsDir)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});



// minificar las imágenes
gulp.task('imagen', function() {
  var imgSrc = sourceDir + imgDir,
      imgDst = destinyDir + imgDirDest;

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst))
    .pipe(livereload());
});

// para minificar el html
gulp.task('htmlmin', function() {
  var htmlSrc = sourceDir + '*.html',
      htmlDst = destinyDir;

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst))
    .pipe(livereload());
});


// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(sourceDir + jscriptsDir)
    .pipe(concat(jsFile))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(destinyDir + jscriptsDirDest))
    .pipe(livereload());
});

// JS concat, strip and minify
gulp.task('scriptsDev', function() {
  gulp.src(sourceDir + jscriptsDir)
    .pipe(concat(jsFile))
    // .pipe(stripDebug())
    // .pipe(uglify())
    .pipe(gulp.dest(destinyDir + jscriptsDirDest))
    .pipe(livereload());
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src([sourceDir + stylesDir])
    .pipe(concat(cssFile))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(destinyDir + stylesDirDest))
    .pipe(livereload());
});

// cp bower stuff
gulp.task('bower',function(){
  var bowerSrc = sourceDir + 'bower_components/**/*',
      bowerDst = destinyDir + 'bower_components/';
      gulp.src(bowerSrc)
      .pipe(gulp.dest(bowerDst))
      .pipe(livereload());;
});

//archivo de configuración
gulp.task('config', function() {
  gulp.src(sourceDir + 'config.js')
    .pipe(gulp.dest(destinyDir))
    .pipe(livereload());
});


// default gulp task
gulp.task('default', ['lint','imagen', 'htmlmin', 'config', 'scriptsDev', 'styles', 'bower','watch-dev'], function() {
  livereload.listen({ basePath: 'dist' });
});

// productio gulp task
gulp.task('prod', ['lint','imagen', 'htmlmin', 'config', 'scripts', 'styles', 'bower','watch'], function() {
  livereload.listen({ basePath: 'dist' });
});



// watch for changes on image directory
watcher(sourceDir + imgDir, function(e,d) {
  gulp.start('imagen');
});

watcher(sourceDir + jscriptsDir, function(e,d) {
  gulp.start('lint','scripts');
});

watcher(sourceDir + stylesDir, function(e,d) {
  gulp.start('styles');
});

gulp.task('watch', function(){
  livereload.listen({ basePath: 'dist'});
  gulp.watch(sourceDir + 'bower_components/**/*', ['bower']);
  gulp.watch(sourceDir + jscriptsDir, ['lint','scripts']);
  gulp.watch(sourceDir + '*.html', ['htmlmin']);
  gulp.watch(sourceDir + stylesDir, ['styles']);
  gulp.watch(sourceDir + imgDir, ['imagen']);
  gulp.watch(sourceDir + 'config.js', ['config']);
});

gulp.task('watch-dev', function(){
  livereload.listen({ basePath: 'dist'});
  gulp.watch(sourceDir + 'bower_components/**/*', ['bower']);
  gulp.watch(sourceDir + jscriptsDir, ['lint','scriptsDev']);
  gulp.watch(sourceDir + '*.html', ['htmlmin']);
  gulp.watch(sourceDir + stylesDir, ['styles']);
  gulp.watch(sourceDir + imgDir, ['imagen']);
  gulp.watch(sourceDir + 'config.js', ['config']);
});
