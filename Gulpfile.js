const gulp = require('gulp');
const responsive = require('gulp-responsive');

gulp.task('full', () => {
  return gulp.src('src/**/*.png')
    .pipe(responsive({
      '*/*': {
        quality: 80,
        progressive: true,
      },
    }))
    .pipe(gulp.dest('dist/full'));
});

gulp.task('medium', () => {
  return gulp.src('src/**/*.png')
  .pipe(responsive({
    '*/*': {
      width: 700,
      quality: 60,
      flatten: true,
      progressive: true,
    },
  }))
  .pipe(gulp.dest('dist/medium'));
});

gulp.task('thumb', () => {
  return gulp.src('src/**/*.png')
  .pipe(responsive({
    '*/*': {
      width: 400,
      quality: 60,
      flatten: true,
    },
  }))
  .pipe(gulp.dest('dist/thumb'));
});

gulp.task('default', ['full', 'medium', 'thumb']);
