const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
gulp.task("css", function () {
  return gulp
    .src("./*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("./dest"));
});

gulp.task("watch", function () {
  gulp.watch("./*.scss", gulp.parallel("css"));
});
