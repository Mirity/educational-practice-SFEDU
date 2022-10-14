import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import { deleteAsync, deleteSync } from 'del';
import ts from 'gulp-typescript';

const { src, dest, series, parallel, watch } = gulp;

const tsProject = ts.createProject('tsconfig.json');
const sass = gulpSass(dartSass);
const sync = browserSync.create();

// Tasks
function scss() {
    return src('./src/scss/*/*.scss')
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
    return src('src/templates/**/*.liquid').pipe(dest('dist/templates'));
}

function script() {
    return src('./src/**/*.js').pipe(dest('dist/'));
}

function typescript() {
    return src('./src/**/**/*.ts')
        .pipe(tsProject())
        .pipe(dest('dist/'));
}

async function clear() {
    return deleteAsync('dist/**');
}

// Add watchers here
function serve() {
    watch('./src/templates/**/**.liquid', series(liquid)).on('change', sync.reload);
    watch('./src/scss/**.scss', series(scss)).on('change', sync.reload);
    watch('./src/**/**.js', series(script)).on('change', sync.reload);
    watch('./src/**/**.ts', series(typescript)).on('change', sync.reload);
}

function startNodemon() {
    nodemon({
        ext: 'js',
        script: './dist/index.js',
    }).on('start', function () {
        // run watchers
        serve();
    });
}

function startBrowserSync() {
    // Start browser
    sync.init({
        proxy: {
            target: 'localhost:3020',
        },
        open: false,
    });
}

const watchNode = parallel(
    startBrowserSync,
    series(
        clear,
        liquid,
        scss,
        typescript,
        script,
        startNodemon
    )
)

export default watchNode;
