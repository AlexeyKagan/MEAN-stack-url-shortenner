// load the plugins
var gulp      = require('gulp');
var sass = require('gulp-sass');
var concat     = require('gulp-concat');
var nodemon    = require('gulp-nodemon');

gulp.task('sass', function() {  
  gulp.src('public/assets/sass/*')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('watch', function() {

  gulp.watch('public/assets/sass/*.scss', ['sass']);

  //gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js']);
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'html css js'    
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function() {
      console.log('Restarted!');
    });
});

gulp.task('default', ['nodemon']);
