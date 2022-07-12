const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//DEPENDENCIAS IMAGENES
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin'); 
const cache = require('gulp-cache');
const avif = require ('gulp-avif')

//FUNCIONES CSS
function css( done ) {
    src('src/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        .pipe( plumber())
        .pipe( sass() ) // Compilarlo
        .pipe( dest('build/css') ) // Almacenarla en el disco duro
    done();
}

//FUNCIONES IMAGENES
function versionWebp(done) {//WEBP
    const opciones = {
        quality:50
    }
    src("src/img/**/*.{png,jpg}")
    .pipe(webp(opciones))
    .pipe(dest("build/img"))
    done();
}
function imagenes(done) {//Minificar
    const opciones= {
        optimizationLevel:3
    }
    src("src/img/**/*.{png,jpg}")
    .pipe( cache(imagemin(opciones)))
    .pipe(dest("build/img"))
    done()
}
function versionAvif(done) {//Version AVIF menos soporte
    const opciones = {
        quality:50
    }
    src("src/img/**/*.{png,jpg}")
    .pipe(avif(opciones))
    .pipe(dest("build/img"))
    done();
}


//JAVASCRIPT
function javascript(done){
    src("src/js/**/*.js")
    .pipe(dest("build/js"))
    done()
}

//TAREA DEV
function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done(); 
}


function tarea (done) {
    console.log('Desde la primera tarea');
    done();
}
 
//EXPORTAMOS TAREAS PARA PODER USAR CON NPM/NPX
exports.tarea = tarea;
exports.css = css;
exports.versionWebp = webp;
exports.dev=parallel(dev);//parallel para ejecutar las tareas de gulp al mismo tiempo
exports.imagenes=imagenes;
exports.versionAvif=avif;
exports.js=javascript;
