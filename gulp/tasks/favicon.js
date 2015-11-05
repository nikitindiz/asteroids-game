var gulp = require('gulp');
var config = require('../config').favicon;
var browserSync  = require('browser-sync');

gulp.task('favicon', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});
/**
 * Created by Alexander on 11/1/2015.
 */
