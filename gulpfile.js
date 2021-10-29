var gulp = require("gulp");
var postcss = require("gulp-postcss");

var autoprefixer = require("autoprefixer");
gulp.task("css", function () {
  var processors = [
    autoprefixer({ browsers: ["last 4 versions"], grid: true }),
  ];
  return gulp
    .src("./*.css")
    .pipe(postcss(processors))
    .pipe(gulp.dest("./dest"));
});
