var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
//var watchPath = require('gulp-watch-path');
var combiner = require('stream-combiner2');
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var browserSync = require('browser-sync');
//var sass = require('gulp-ruby-sass');
//var imagemin = require('gulp-imagemin');

var handleError = function(err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
};

/*一次编译所有 js 文件，通过命令行gulp uglifyjs执行*/
gulp.task('uglifyjs', function() {
    var combined = combiner.obj([
        gulp.src('src/js/**/*.js'),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('dist/js/')
    ]);
    combined.on('error', handleError);
});

/*一次编译所有css文件，通过命令行gulp minifycss执行*/
gulp.task('minifycss', function() {
    gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'));
});

/*一次性编译less,直接生成min.css*/
gulp.task('lesscss', function() {
    var combined = combiner.obj([
        gulp.src('src/less/**/*.less'),
        sourcemaps.init(),
        autoprefixer({
            browsers: 'last 2 versions'
        }),
        less(),
        minifycss(),
        sourcemaps.write('./'),
        gulp.dest('dist/css/')
    ]);
    combined.on('error', handleError);
});

/*一次性压缩图片*/
gulp.task('image', function() {
    gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'));
});

/* 一次性复制src/fonts/ 文件到 dist/ 中*/
gulp.task('copy', function() {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('browser-sync', function() {
    browserSync({
        port: 7777,
        files: "**",
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ["browser-sync"]);
/*
/!*时刻编译js文档*!/
gulp.task('watchjs', function () {
    gulp.watch('src/js/!**!/!*.js', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            uglify(),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
})

/!*时刻压缩css文档*!/
gulp.task('watchcss', function () {
    gulp.watch('src/css/!**!/!*.css', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: 'last 2 versions'
            }))
            .pipe(minifycss())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
})

/!*时刻编译less*!/
gulp.task('watchless', function () {
    gulp.watch('src/less/!**!/!*.less', function (event) {
        var paths = watchPath(event, 'src/less/', 'dist/css/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
                browsers: 'last 2 versions'
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
})
/!*压缩图片*!/
gulp.task('watchimage', function () {
    gulp.watch('src/images/!**!/!*', function (event) {
        var paths = watchPath(event,'src/','dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
})


/!*复制 src/fonts/ 文件到 dist/ 中*!/
gulp.task('watchcopy', function () {
    gulp.watch('src/fonts/!**!/!*', function (event) {
        var paths = watchPath(event)

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
    })
})

gulp.task('default', ['watchjs','watchcss', 'watchimage', 'watchcopy','watchless'])/!*在这里调用gulp,所需要的方法可以写在这里*!/*/
