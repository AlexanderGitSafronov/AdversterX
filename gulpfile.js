const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const fs = require("fs");

function fontsWoff() {
  return src("src/fonts/*.ttf")
    .pipe(fonter({ formats: ["woff", "ttf"] }))
    .pipe(src("src/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("src/fonts/"));
}

function styles() {
  return src("src/scss/style.scss")
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

function imagesMin() {
  return src(["src/img/**/*.*"], { encoding: false })
    .pipe(imagemin())
    .pipe(dest("src/images"));
}

function htmlPage() {
  return src("src/index.html")
    .pipe(concat("index.min.html"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("src/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["node_modules/swiper/swiper-bundle.js", "src/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

function watching() {
  watch(["src/scss/style.scss"], styles);
  watch(["src/js/main.js"], scripts);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

function browsrsinc() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
}

function building() {
  return src(
    [
      // "src/index.html",
      "src/css/style.min.css",
      "src/js/main.min.js",
      "src/images/**",
      "src/fonts/*.*",
    ],
    { base: "src", encoding: false }
  ).pipe(dest("safronov_oleksandr"));
}
function cleanDist() {
  ensureDirectoryExists("safronov_oleksandr");
  return src("safronov_oleksandr").pipe(clean());
}
function buildingHtml() {
  return src(["src/index.min.html"])
    .pipe(concat("index.html"))
    .pipe(dest("safronov_oleksandr"));
}

function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

exports.fontsWoff = fontsWoff;
exports.styles = styles;
exports.scripts = scripts;
exports.htmlPage = htmlPage;
exports.imagesMin = imagesMin;
exports.watching = watching;
exports.browsrsinc = browsrsinc;
exports.buildingHtml = buildingHtml;
exports.build = series(cleanDist, buildingHtml, building);
exports.default = parallel(
  styles,
  imagesMin,
  fontsWoff,
  scripts,
  htmlPage,
  imagesMin,
  browsrsinc,
  watching
);
