var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    babel = require('gulp-babel'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    nodemon = require('gulp-nodemon');;

var jsPaths = {
    cleanPath: ['./../public/js/*'],
    all: ['./js/*.js', './components/*.js', './app.js'],
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

gulp.task('watch', function() {
    gulp.watch(stylePaths.src, ['bamfify:scss']);
    gulp.watch(jsPaths.all, ['demon']);
})

gulp.task('demon', function () {
  nodemon({
    script: './../server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['bamfify:js', 'bamfify-react:js', 'bamfify:scss'])
    .on('change', ['bamfify:js', 'bamfify-react:js', 'bamfify:scss'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('default', ['demon']);
