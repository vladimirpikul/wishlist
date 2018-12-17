var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    cache = require('gulp-cache');

var PATH = {
    dst: 'app/',
    src: 'src/'
};

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: PATH.dst
        }
    });
});

gulp.task('scss', function () {
    gulp.src(PATH.src + 'scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATH.dst + 'css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function () {
    gulp.src(PATH.src + 'css/**/*.css')
        .pipe(gulp.dest(PATH.dst + 'css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    gulp.src(PATH.src + 'js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('plugins.min.js'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATH.dst + 'js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('imagemin', function() {
    gulp.src(PATH.src + 'img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(PATH.dst + 'img'));
});

gulp.task('watch', ['scss', 'css', 'scripts', 'imagemin', 'browserSync'], function() {
    gulp.watch(PATH.src + 'scss/**/*.scss', ['scss']);
    gulp.watch(PATH.src + 'css/**/*.css', ['css']);
    gulp.watch(PATH.src + 'js/**/*.js', ['scripts']);
    gulp.watch(PATH.src + 'img/**/*', ['imagemin']);
    gulp.watch(PATH.dst + '*.html', browserSync.reload);
});

gulp.task('default', ['watch']);