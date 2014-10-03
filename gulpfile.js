process.env.NODE_PATH = process.env.NODE_PATH || './node_modules';
process.env.NODE_PATH += ":./app/js";

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');

var sources = {
  js: 'app/js/**/*.js',
  html: 'app/**/*.jade',
  css: 'app/**/*.css',
};

gulp.task('scripts', function() {
  gulp.src('app/js/app.js')
    .pipe(browserify({debug: true}))
    .pipe(gulp.dest('./.build/js'));
});

gulp.task('html', function() {
  gulp.src(sources.html)
    .pipe(jade())
    .pipe(gulp.dest('./.build'));
});

gulp.task('css', function() {
  gulp.src(sources.css)
    .pipe(gulp.dest('./.build'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./.build"
    }
  });
});

gulp.task('server', ['browser-sync'], function () {
  gulp.watch(sources.js, ['scripts', browserSync.reload]);
  gulp.watch(sources.html, ['html', browserSync.reload]);
  gulp.watch(sources.css, ['css', browserSync.reload]);
});

gulp.task('default', ['scripts', 'html', 'css', 'server']);
