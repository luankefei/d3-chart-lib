var gulp = require('gulp')
var jshint = require('gulp-jshint')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

var karma = require('karma')
//var browserSync = require('browser-sync')


var connect = require('gulp-connect')
var livereload = require('gulp-livereload')

// 路径配置
var paths = {

    scripts: [
            'src/main.js',
            'src/core.js',
            'src/dom.js',
            'src/http.js',
            'src/chart.js',
            'src/chart/lengthBar.js',
            'src/interactive.js',
            'src/component.js',
            'src/component/axis.js',
            'src/util.js',
            'src/events.js',
            'src/extend.js'
            ],
    images: ''
}

gulp.task('connect', ['minify'], function() {

    connect.server({
        root: '',
        livereload: true
    })
})

// Lint JS
gulp.task('lint', ['minify'], function() {
    return gulp.src('dist/ycharts.js;')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

// Concat & Minify JS
gulp.task('minify', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('ycharts.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('ycharts.min.js'))
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

// Watch Our Files
gulp.task('watch', function() {

    var server = livereload({ start: true })

    livereload.listen()


    gulp.watch('*.html', ['html'], function(file) {

        server.changed(file.path)

        server.reload()
    })

    gulp.watch('src/**', ['lint', 'minify', 'script'], function(file) {
        
        server.changed(file.path)
    })
})


// gulp.task('bundle', function ()
// {
//     return gulp.src('**/*.js')
//         .pipe(amdOptimize('main'))
//         .pipe(concat('main-bundle.js'))
//         .pipe(gulp.dest('dist'));
// });

// karma test
gulp.task('karma', function() {
    karma.server.start({
        configFile: process.cwd() + '/karma.conf.js',
        singleRun: true

    }, done)
})

// Default
//gulp.task('default', ['lint', 'minify', 'watch', 'browser-sync'])
gulp.task('default', ['minify', 'watch', 'connect'])
gulp.task('package', ['minify'])

