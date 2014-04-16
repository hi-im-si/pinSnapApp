var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'www',
    livereload:true
  });
});



gulp.task('watch:html', function () {
    watch({glob: './www/templates/*.html'}, function(files) {
        return files.pipe(connect.reload());
    });
    watch({glob: './www/*.html'}, function(files) {
        return files.pipe(connect.reload());
    });
});

gulp.task('watch:js', function () {
    watch({glob: './www/js/*.js'}, function(files) {
        return files.pipe(connect.reload());
    });
});

gulp.task('default', ['sass', 'connect', 'watch', 'watch:html', 'watch:js']);
