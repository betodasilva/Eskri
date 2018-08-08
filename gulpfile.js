const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    shell = require('gulp-shell'),
    clean = require('gulp-clean'),
    siteRoot = '_site';


// uglify JavaScripts
var dir = {
    base: './src',
    js: this.base + '/js',
    sass: this.base + '/sass'
}



gulp.task('uglify', function(){
    gulp.src( dir.js + '/*' )
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
    
});

gulp.task('clean-css', function(){
    gulp.src('/build/css/main.css', {read: false})
        .pipe(clean());
});

gulp.task('minify', function(){
    return gulp.src( [dir.base + '/sass/main.scss', dir.base + '/vendor/vendor.scss'] )
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(gulp.dest('build/css'));
});

gulp.task('sass-watch', ['minify'], browserSync.reload);

gulp.task('build', shell.task(['bundle exec jekyll build --watch']));

gulp.task('watch', function(){
    browserSync.init({
        files: [siteRoot + '/**'],
        port: 4000,
        server: {
            baseDir: siteRoot
        }
    });
    gulp.watch('./src/*.js', ['uglify']);
    gulp.watch('./src/sass/*.scss', ['sass-watch']);
});




gulp.task('default', ['uglify', 'minify', 'build', 'watch']);