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

// salida de consola
var gutil = require('gulp-util');

// para tener los nombres de los archivos
var debug = require('gulp-debug');

/**
 * Diretory structure
 */

var sourceDir = './',
    destinyDir = './dist/',
    jscriptsDir = './js/*.js',
    jscriptsDirDest = 'js/',
    stylesDir = './css/*.css',
    stylesDirDest = 'css/',
    imgDir = 'img/**/*',
    imgDirDest = 'img/';

var jsFile = 'main.js',
    cssFile = 'main.css';


gulp.task('lint', function() {
  gulp.src(sourceDir + jscriptsDir)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// minificar las imágenes

gulp.task('imagen', function() {
  gutil.log('stuff happened', 'Really it did', gutil.colors.magenta('123'));
  var imgSrc = sourceDir + imgDir,
      imgDst = destinyDir + imgDirDest;
  gulp.src(imgSrc)
    .pipe(debug())
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

gulp.task('scriptsDev', function() {
  gulp.src(sourceDir + jscriptsDir)
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
      .pipe(livereload());
});


// cp fonts stuff
gulp.task('fonts',function(){
  var assetsSrc = sourceDir + fuentesDir,
      assetsDst = destinyDir + fuentesDest;
      gulp.src(assetsSrc)
      .pipe(gulp.dest(assetsDst))
      .pipe(livereload());
});


// default gulp task
gulp.task('default', ['lint','imagen', 'htmlmin', 'scriptsDev', 'styles','bower','watchDev'], function() {
  livereload.listen({ basePath: 'dist' });
});

gulp.task('prod', ['lint','imagen', 'htmlmin', 'scripts', 'styles', 'bower'], function() {

});




gulp.task('watch', function(){
  livereload.listen({ basePath: 'dist'});
  gulp.watch(sourceDir + 'bower_components/**/*', ['bower']);
  gulp.watch(sourceDir + jscriptsDir, ['lint','scripts']);
  gulp.watch(sourceDir + '*.html', ['htmlmin']);
  gulp.watch(sourceDir + stylesDir, ['styles']);
  gulp.watch(sourceDir + imgDir, ['imagen']);
});

gulp.task('watchDev', function(){
  livereload.listen({ basePath: 'dist'});
  gulp.watch(sourceDir + 'bower_components/**/*', ['bower']);
  gulp.watch(sourceDir + jscriptsDir, ['lint','scriptsDev']);
  gulp.watch(sourceDir + '*.html', ['htmlmin']);
  gulp.watch(sourceDir + stylesDir, ['styles']);
  gulp.watch(sourceDir + imgDir, ['imagen']);
});
