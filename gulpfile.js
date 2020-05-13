var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('clean', async function () {
    del.sync('dist');
});

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 8 versions"]
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }));
});



gulp.task('sprite', function () {
    return gulp.src('app/img/icon-*.svg')
        .pipe(svgmin({
            minify: true
        }))
        .pipe(svgstore({
            inlineSvg: true

        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('app/img'));
});

gulp.task('posthtml', function () {
    return gulp.src('app/*.html')
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest('app/'));
});

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }));
});


// gulp.task('js', function() {
//     return gulp.src([
//         'node_modules/slick-carousel/slick/slick.js'
//         ])
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('app/js'))
//         .pipe(browserSync.reload({ stream: true }))
//
// });

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('export', function () {
    var buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));

    var buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    var buildSlick = gulp.src('app/slick/**/*.*')
        .pipe(gulp.dest('dist/slick'));

    var buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    var buildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('css', 'scss', 'posthtml', 'browser-sync', 'watch'));
//Когда будет JS вставить 'js'
