var gulp = require('gulp');
var config = require('../config').sound;
var browserSync  = require('browser-sync');

gulp.task('sound', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});
