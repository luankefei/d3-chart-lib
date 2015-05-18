var gulp = require('gulp')
var jshint = require('gulp-jshint')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

var karma = require('karma')
//var browserSync = require('browser-sync')


var connect = require('gulp-connect')
var livereload = require('gulp-livereload')

var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');

gulp.task('connect', function() {

    connect.server({
        root: '',
        livereload: true
    })
})

// Lint JS
gulp.task('lint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

// Concat & Minify JS
gulp.task('minify', function() {
    return gulp.src('src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
});

gulp.task('html', function() {

    livereload.reload()
})

gulp.task('script', function() {

    livereload.reload()
})

gulp.task('css', function() {

    livereload.reload()  
})

// Watch Our Files
gulp.task('watch', function() {

    var server = livereload({ start: true })

    livereload.listen()


    gulp.watch('src/*.html', ['html'], function(file) {

        server.changed(file.path)

        server.reload()
    })

    gulp.watch('src/js/*.js', ['lint', 'minify', 'script'], function(file) {

        server.changed(file.path)

    })

    gulp.watch('src/css/*.css', ['lint', 'minify', 'script'], function(file) {

        server.changed(file.path)

    })
})


gulp.task('bundle', function ()
{
    return gulp.src('**/*.js')
        .pipe(amdOptimize('main'))
        .pipe(concat('main-bundle.js'))
        .pipe(gulp.dest('dist'));
});

// karma test
gulp.task('karma', function() {
    karma.server.start({
        configFile: process.cwd() + '/karma.conf.js',
        singleRun: true

    }, done)
})

// Default
//gulp.task('default', ['lint', 'minify', 'watch', 'browser-sync'])
gulp.task('default', ['lint', 'minify', 'watch', 'connect', 'bundle'])

