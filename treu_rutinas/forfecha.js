/* -------------------------------------------------------
   Rutina para formatear fechas
   ------------------------------------------------------- */

   function forfecha(format, obj, opciones) {

    var ln;
    var i;
    var entrada;
    var formatox;
    var posi;
    var longi;
    var vale;
    var ceros;
    var forma;
    var largo;
    var car;

    entrada = false;

    ln = opciones.length;
    for (i = 1; i <= ln; i++) {
        car = opciones.substr(i - 1, 1);
        if (car == 'E') {
            entrada = true;
        }
    }

    formatox = format;
    if (format.charAt(0) == 'A') formatox = "D0/M0/Y###";
    if (format.charAt(0) == 'B') formatox = "D0/M0/Y0";
    if (format.charAt(0) == 'C') formatox = "D0/M0";
    if (format.charAt(0) == 'X') formatox = "M0/Y0";

    longi = formatox.length;
    forma = '';

    posi = 0;

    while (posi <= longi - 1) {

        // Procesado del dia;

        if (posi > formatox.length - 1) break;

        if (formatox.charAt(posi) == 'D') {

            posi++;
            vale = false;
            ceros = false;

            if (formatox.charAt(posi) == '0') {
                ceros = true;
                vale = true;
                posi++
            } else {
                if (formatox.charAt(posi) == '#') {
                    ceros = false;
                    vale = true;
                    posi++;
                }
            }

            if (vale == true) {
                if (ceros == true) forma += form('##', obj.getDate(), '0');
                if (ceros == false) forma += form('##', obj.getDate(), '');
            }
        }

        // Procesado del mes

        if (posi > formatox.length - 1) break;

        if (formatox.charAt(posi) == 'M') {

            posi++;
            vale = false;
            ceros = false;

            if (formatox.charAt(posi) == '0') {
                ceros = true;
                vale = true;
                posi++;
            } else {
                if (formatox.charAt(posi) == '#') {
                    ceros = false;
                    vale = true;
                    posi++;
                }
            }

            if (vale == true) {
                if (ceros == true) forma += form('##', obj.getMonth() + 1, '0');
                if (ceros == false) forma += form('##', obj.getMonth() + 1, '');
            }
        }

        // Procesado del Año

        if (posi > formatox.length - 1) break;

        if (formatox.charAt(posi) == 'Y') {

            posi++;
            vale = false;
            ceros = false;

            if (formatox.charAt(posi) == '0') {
                ceros = true;
                vale = true;
                posi++;
            } else {
                if (formatox.charAt(posi) == '#') {
                    ceros = false;
                    vale = true;
                    posi++;
                }
            }

            if (vale == true) {

                largo = false;

                if (posi <= formatox.length - 2) {
                    if (formatox.charAt(posi) == '#' && formatox.charAt(posi + 1) == '#') {
                        largo = true;
                        posi += 2;
                    }
                }

            }

            if (ceros == true && largo == false) forma += form('##', obj.getFullYear() - 2000, '0');
            if (ceros == false && largo == false) forma += form('##', obj.getFullYear() - 2000, '');
            if (ceros == true && largo == true) forma += form('####', obj.getFullYear(), '0');
            if (ceros == false && largo == true) forma += form('####', obj.getFullYear(), '');

        }

        // Procesado del resto de Variables

        if (posi > formatox.length - 1) break;

        if (formatox.charAt(posi) == 'E') {
            posi++;
            forma += "DE";
        }

        if (posi > formatox.length - 1) break;

        if (formatox.charAt(posi) == 'e') {
            posi++;
            forma += "de";
        }

        if (posi > formatox.length - 1) break;

        if (formatox.charAt(posi) == '/' || formatox.charAt(posi) == '-' || formatox.charAt(posi) == ' ') {
            forma += formatox.charAt(posi);
            posi++;
        }

    }

    return forma;
}