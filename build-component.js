const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
    const files = [
        './dist/componentes-angular/runtime.js',
        './dist/componentes-angular/polyfills.js',
        './dist/componentes-angular/scripts.js',
        './dist/componentes-angular/main.js',
        './Treu_Rutinas/forfecha.js',
        './Treu_Rutinas/formato.js',
        './Treu_Rutinas/lista_de_campos_rutinas.js',
        './Treu_Rutinas/rutinas_varias.js'       
    ];

    await fs.ensureDir('widgets-final');
    await concat(files, 'widgets-final/treu-widgets.js');
}
build();