'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var less        = require('gulp-less');

// Static Server + watching less files
gulp.task('serve', ['less'], function() {

    browserSync({
        proxy: 'localhost:3000',
    });
    gulp.watch('app/css/*.less', ['less']);
    gulp.watch("app/*.html").on('change', reload);
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
    return gulp.src("app/css/main.less")
        .pipe(less())
        .pipe(gulp.dest("app/css"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);

