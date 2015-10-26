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
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer');

var jsPaths = {
    cleanPath: ['public/js/*'],
    all: ['static/js/**/*.js', 'static/components/**/*.js', 'static/*.js'],
    src: ['static/js/**/*.js'],
    components: ['static/components/'],
    maps: './',
    build: 'public/js',
    app: 'static/browser.js'
}

var stylePaths = {
    cleanPath: ['public/css/*'],
    src: ['static/scss/**/*.scss'],
    build: 'public/css'
}

var watchPaths = {
    all: ['server.js', 'gulpfile.js', 'static/js/**/*.js', 'static/components/**/*.js', 'static/*.js']
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
        // .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        // .pipe(sourcemaps.write(jsPaths.maps, {
        //   inludeContent: false
        // }))
        .pipe(gulp.dest(jsPaths.build));
});

gulp.task('bamfify-react:js', function () {
  browserify({
    entries: jsPaths.app,
    extensions: ['.js'],
    debug: false
  })
  .transform(babelify)
  .transform(literalify.configure({react: 'window.React'))
  .bundle()
  .pipe(source('bundle.min.js'))
  .pipe(buffer())
  // .pipe(sourcemaps.init({
  //     loadMaps: true
  // }))
  .pipe(uglify())
  // .pipe(sourcemaps.write(jsPaths.maps))
  .pipe(gulp.dest(jsPaths.build));
});

gulp.task('bamfify:scss', function () {
  return transpileScssSource(stylePaths.src, stylePaths.build);
});

gulp.task('watch:scss', function() {
    gulp.watch(stylePaths.src, ['bamfify:scss']);
})

gulp.task('demon', function () {
  // gulp.watch(watchPaths.all, function () {
  //     nodemon({
  //       script: 'server.js'
  //     })
  // });
  nodemon({
    script: 'server.js',
    watch: [
      watchPaths.all
    ],
    ignore: '*.scss',
    env: {
      'NODE_ENV': 'development'
    },
    tasks: function (changedFiles) {
      var tasks = [];
      console.log('BRYSON');
      console.log(changedFiles);
      changedFiles.forEach(function (file) {
        console.log('bryson');
        if (path.extname(file) === '.js' &&
          path.dirname(file) !== jsPaths.build &&
          path.dirname(file) !== jsPaths.components &&
          !~tasks.indexOf('bamfify:js')) {

          tasks.push('bamfify:js')
        } else if (path.extname(file) === '.js' &&
          path.dirname(file) !== jsPaths.build &&
          path.dirname(file) === jsPaths.components &&
          !~tasks.indexOf('bamfify-react:js')) {

          tasks.push('bamfify-react:js')
        }
      })
      console.log(tasks);
      return tasks
    }
  })
  .on('crash', function () {
    console.log('ERMYGOD IT CRASHEDD!!!!!');
  })
  .on('change', function () {
    console.log('And then i CHANGED!')
    nodemon.emit('restart');
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('default', ['bamfify:js', 'bamfify-react:js', 'bamfify:scss', 'demon', 'watch:scss']);
