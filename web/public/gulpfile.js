var gulp = require('gulp'),
    babel = require('gulp-babel'),
    changed = require('gulp-changed'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    cleanPath: ['./js/build/*'],
    src: ['js/src/**/*.js'],
    maps: 'js/maps',
    all: 'js/src/**/*.js',
    build: './js/build'
};

gulp.task('build:js', function () {
    return gulp.src(paths.src)
        .pipe(changed(paths.build))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(changed(paths.build), { hasChanged: changed.compareSha1Digest })
        .pipe(sourcemaps.write('js/source'))
        .pipe(gulp.dest(paths.build));
});
