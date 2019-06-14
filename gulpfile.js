const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('clean', () => del(['lib']));

const build = (
  src = ['src/**/*.js', '!src/**/*.spec.js', '!src/**/*.test.js'],
  dest = 'lib'
) => () =>
  gulp
    .src(src)
    .pipe(babel())
    .pipe(gulp.dest(dest));

gulp.task('build', build());

gulp.task('default', gulp.series('clean', gulp.parallel('build')));
