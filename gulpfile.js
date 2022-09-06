import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import include from 'gulp-file-include'
import { deleteSync } from 'del';

const { src, dest, series, parallel, watch } = gulp;

const sass = gulpSass(dartSass);
const sync = browserSync.create();

// Tasks
function scss() {
    return src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['>1%'],
            }),
        )
        .pipe(csso())
        .pipe(concat('style.css'))
        .pipe(dest('./dist/css'));
}


function liquid() {
    return src('src/templates/*.liquid')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('dist/templates'));
}

function script() {
    src('./src/App.js').pipe(dest('dist'));

    return src('./src/**/*.js').pipe(dest('dist/'));
}

function clear() {
    return deleteSync('dist/**');
}

// Add watchers here
function serve() {
    watch('./src/templates/**.liquid', series(liquid)).on('change', sync.reload);
    watch('./src/scss/**.scss', series(scss)).on('change', sync.reload);
    watch('./src/**/**.js', series(script)).on('change', sync.reload);
}

export default async function watchNode() {
    // Start browser
    sync.init({
        proxy: {
            target: 'localhost:3020',
        },
        open: false,
    });

    clear();
    liquid();
    scss();
    script();

    // Start nodemon
    nodemon({
        ext: 'js',
        script: './dist/index.js',
    }).on('start', function () {
        // run watchers
        serve();
    });
}
