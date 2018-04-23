require('dotenv').config();
const gulp = require('gulp');
const responsive = require('gulp-responsive');
const s3 = require('gulp-s3-upload')({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;

const makeImageTask = (customConfig = []) => {

  const config = customConfig.map(c => Object.assign({
    skipOnEnlargement: true,
    withoutEnlargement: false,
    progressive: true,
    flatten: true,
  }, c));

  return gulp.task('images', () => {
    return gulp.src('src/**/*.{png,gif,jpg}')
      .pipe(responsive({
        '*': config,
        '*/*': config,
      }))
      .pipe(gulp.dest(`dist`))
      .pipe(s3({
        Bucket: process.env.BUCKET_NAME,
        ACL: 'public-read',
        CacheControl: `max-age=${TWO_WEEKS}`,
      }, {
        maxRetries: 5
      }));
  });
};

makeImageTask([{
  width: 200,
  rename: { suffix: '-200px' },
}, {
  width: 450,
  rename: { suffix: '-450px' },
}, {
  width: 700,
  rename: { suffix: '-700px' },
}, {
  rename: { suffix: '-original' },
}]);

gulp.task('default', ['images']);
