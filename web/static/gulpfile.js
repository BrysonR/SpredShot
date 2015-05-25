var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    babel = require('gulp-babel'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps');

var jsPaths = {
    cleanPath: ['./../public/js/*'],
    src: ['./js/*.js'],
    maps: './',
    build: './../public/js',
    app: './app.js'
}

var stylePaths = {
    cleanPath: ['../public/css/*'],
    src: ['./scss/**/*.scss'],
    build: '../public/css'
}

function transpileScssSource(path, dest) {
    return gulp.src(path)
        .pipe(sass())
        .pipe(gulp.dest(dest));
};

gulp.task('bamfify:js', function () {
    return gulp.src(jsPaths.src)
        .pipe(sourcemaps.init())
          .pipe(babel())
        .pipe(sourcemaps.write(jsPaths.maps, {
          inludeContent: false
        }))
        .pipe(gulp.dest(jsPaths.build));
});

gulp.task('bamfify-react:js', function () {
  browserify({
    entries: jsPaths.app,
    extensions: ['.js'],
    debug: false
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(jsPaths.build));
});

gulp.task('bamfify:scss', function () {
  return transpileScssSource(stylePaths.src, stylePaths.build);
});

gulp.task('watch', function () {
  gulp.watch(stylePaths.src, ['bamfify:scss']);
  gulp.watch(jsPaths.src, ['bamfify:js', 'bamfify-react:js']);
});

gulp.task('default', ['bamfify:js', 'bamfify-react:js', 'bamfify:scss']);
