process.env.NODE_PATH = process.env.NODE_PATH || './node_modules';
process.env.NODE_PATH += ":./app/js";

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');

var sources = {
  js: 'app/js/**/*.js',
  html: 'app/**/*.jade',
  css: 'app/**/*.css',
  images: 'app/images/**/*.png',
};

gulp.task('app', function() {
  gulp.src('app/js/app.js')
    .pipe(browserify({debug: true}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./.build/js'));
});

gulp.task('vendor', function() {
  gulp.src('app/js/vendor.js')
    .pipe(browserify({
      noParse: ['angular/angular', 'pouchdb/dist/pouchdb', 'rxjs/dist/rx.all.js']
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./.build/js'));
});

gulp.task('scripts', ['app', 'vendor']);

gulp.task('html', function() {
  gulp.src(sources.html)
    .pipe(jade())
    .pipe(gulp.dest('./.build'));
});

gulp.task('css', function() {
  gulp.src(sources.css)
    .pipe(gulp.dest('./.build'));
});

gulp.task('images', function() {
  gulp.src(sources.images)
    .pipe(gulp.dest('./.build/images'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./.build"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(sources.js, ['scripts']);
  gulp.watch(sources.html, ['html']);
  gulp.watch(sources.css, ['css']);
  gulp.watch(sources.images, ['images']);
});

gulp.task('server', ['browser-sync', 'watch'], function () {
  gulp.watch('.build/**/*', browserSync.reload);
});

gulp.task('default', ['scripts', 'html', 'css', 'images', 'server']);
