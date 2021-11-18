const gulp = require("gulp");
const postcss = require("gulp-postcss");
//const sass = require("gulp-sass");
var sass = require("gulp-sass")(require("sass"));
var autoprefixer = require("autoprefixer");
gulp.task("css", function () {
  const processors = [
    autoprefixer({ browsers: ["last 4 versions"], grid: true }),
  ];
  return gulp
    .src("./*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest("./dest"));
});

gulp.task("watch", function () {
  gulp.watch("./*.scss", gulp.parallel("css"));
});
