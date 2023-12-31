const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
    
    const files = [
        './dist/componentes-angular/runtime.js',
        './dist/componentes-angular/polyfills.js',
        './dist/componentes-angular/scripts.js',
        './dist/componentes-angular/main.js'
    ];

    await fs.ensureDir('/home/salvador/Trabajos_NodeJS/Widgets-final');
    await concat(files, '/home/salvador/Trabajos_NodeJS/Widgets-final/treu-widgets.js');
}
build();