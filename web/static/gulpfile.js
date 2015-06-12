var gulp = require('gulp'),
    sass = require('gulp-sass'),
    literalify = require('literalify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    babel = require('gulp-babel'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer');

var jsPaths = {
    cleanPath: ['./../public/js/*'],
    all: ['./js/**/*.js', './components/**/*.js', './app.js'],
    src: ['./js/**/*.js'],
    maps: './',
    build: './../public/js',
    app: './browser.js'
}

var stylePaths = {
    cleanPath: ['../public/css/*'],
    src: ['./scss/**/*.scss'],
    build: '../public/css'
}

function transpileScssSource(path, dest) {
    return gulp.src(path)
        .pipe(sass())
        .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }))
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
  .transform(literalify.configure({react: 'window.React'}))
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
    },
    tasks: function (changedFiles) {
        var tasks = []
        changedFiles.forEach(function (file) {
          if (path.extname(file) === '.js' && !~tasks.indexOf('bamfify:js')) tasks.push('bamfify:js') && tasks.push('bamfify-react:js')
          if (path.extname(file) === '.scss' && !~tasks.indexOf('bamfify:scss')) tasks.push('bamfify:scss')
        })
        return tasks
      }
  })
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('default', ['bamfify:js', 'bamfify-react:js', 'bamfify:scss', 'demon']);
