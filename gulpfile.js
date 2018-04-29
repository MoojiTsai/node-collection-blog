var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    mainBowerFiles = require('main-bower-files');



gulp.task('bower', function() {
    return gulp.src(mainBowerFiles({
               overrides: {
                   bootstrap: {
                       main: [
                           './dist/js/bootstrap.js',
                           './dist/css/*.css'
                       ]
                   } 
               }
           }))
        .pipe(gulp.dest('./.tmp/vendor'));
});

gulp.task('VendorJs',['bower'], function() {
  return gulp.src('./.tmp/vendor/**/*.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('VendorCss',['bower'], function() {
  return gulp.src('./.tmp/vendor/**/*.css')
    .pipe(gulp.dest('./public/css'));
});

gulp.task('scss', function() {
  return gulp.src('./source/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));

});
gulp.task('scss:watch', function () {
  gulp.watch('./source/**/*.scss', ['scss']);
});


gulp.task('default',['VendorJs','VendorCss','scss','scss:watch']);
