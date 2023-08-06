import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
declare const form: any;
declare const parseBoolean: any;
declare const beep: any;

@Component({
    selector: 'treung-numer',
    templateUrl: './treung-numer.component.html',
    styleUrls: ['./treung-numer.component.scss']
})
export class TreungNumerComponent implements OnInit {

    @ViewChild('obj_numer', { static: false }) input: ElementRef; // remove { static: false } if you're using Angular < 8 

    @Input() id: string;
    @Input() size: any;
    @Input() formato: any;
    @Input() value: any;
    //pendiente = false;
    //pendiente_valor = "";
    @Input() disabled = false;
    dentro = false;
    @Input() valor_positivo = false;
    getdis = "";
    ondatachange_str: string;

    @Output()
    copy: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    paste: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    cut: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    datachange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private elementRef: ElementRef) {

        Object.defineProperty(this.elementRef.nativeElement, 'value', {
            get: () => { return this.getvalue(); },
            set: (valo) => { this.setvalue(valo); },
            enumerable: true
        });

        Object.defineProperty(this.elementRef.nativeElement, 'id', {
            get: () => { return this.id; },
            set: (valo) => { this.id = valo; },
            enumerable: true
        });

        Object.defineProperty(this.elementRef.nativeElement, 'disabled', {
            get: () => { return this.disabled; },
            set: (valo) => { this.setdisabled(valo); },
            enumerable: true
        });

    }

    ngOnInit(): void {

        this.datachange.subscribe((valor) => {
            this.cambiodata();
        })

        this.formato = this.elementRef.nativeElement.getAttribute('formato');
        this.disabled = parseBoolean(this.elementRef.nativeElement.getAttribute('disabled'));
        this.size = parseInt(this.elementRef.nativeElement.getAttribute('size'));
        this.value = parseFloat(this.elementRef.nativeElement.getAttribute('value'));
        this.valor_positivo = parseBoolean(this.elementRef.nativeElement.getAttribute('valor_positivo'));
        this.ondatachange_str = this.elementRef.nativeElement.getAttribute('ondatachange');

        if (this.disabled == true) {
            this.getdis = "disabled";
        }
        else {
            this.getdis = "";
        }

        if (this.formato == undefined) {
            this.formato = "###.###";
        }

        if (this.size == 0 || isNaN(this.size)) {
            this.size = 15;
        }

    }

    ngAfterViewInit() {

        if (isNaN(this.value) == false) {
            this.setvalue(this.value);
        }

    }

    cambiodata() {
        eval(this.ondatachange_str);
    }

    setdisabled(valo: boolean) {
        this.disabled = valo;
        this.input.nativeElement.disabled = valo;
    }

    setvalue(valuex: number) {

        var serie, longipos, salta, i: number;

        longipos = 0;
        salta = false;
        for (i = 1; i <= this.formato.length; i++) {
            if (this.formato.charAt(i - 1) !== '.' && salta === true)
                longipos++;
            if (this.formato.charAt(i - 1) === ',')
                salta = true;
        }

        if (isNaN(valuex)) {
            serie = "";
        }
        else if (typeof valuex == 'number') {
            if (this.valor_positivo == true) {
                serie = Math.abs(parseFloat(valuex.toFixed(longipos))).toString();
            }
            else {
                serie = valuex.toFixed(longipos).toString();
            }
        }
        else if (typeof valuex == 'string' && valuex != "") {
            if (this.valor_positivo == true) {
                serie = Math.abs(parseFloat(parseFloat(valuex).toFixed(longipos))).toString();
            }
            else {
                serie = parseFloat(valuex).toFixed(longipos).toString();
            }
        }
        else {
            serie = "";
        }

        var str2 = '';
        var lon = serie.length;
        for (var i = 1; i <= lon; i++) {
            var car = serie.substring(i - 1, i);
            if (car !== ' ' && car !== ',' && car !== '.') {
                str2 += car;
                continue;
            }
            if (car === '.') {
                str2 += ',';
            }
        }
        serie = str2;

        var cumple = this.validarstringnumerico(serie, this.formato);

        if (cumple === false && serie != "") {
            beep();
            return;
        }

        this.input.nativeElement.value = serie;
        if (this.dentro == false) {
            this.ponerformato();
        }
        this.datachange.emit("datachange");

    }

    getvalue() {
        if (this.input.nativeElement == null) return 0.0;
        var nume = parseFloat(this.leervalorstr());
        return nume;
    }

    ponerformato() {

        var str, lon, i, str2, numero, format, car;

        str = this.input.nativeElement.value;
        format = this.formato;
        str2 = '';

        lon = str.length;
        for (i = 1; i <= lon; i++) {
            car = str.substring(i - 1, i);
            if (car !== ' ' && car !== ',' && car !== '.') {
                str2 += car;
                continue;
            }
            if (car === ',') {
                str2 += '.';
            }
        }
        if (str2 !== '') {
            numero = parseFloat(str2);
        } else {
            numero = 0;
        }

        this.input.nativeElement.style.textAlign = "right";

        this.input.nativeElement.value = form(format, numero, "Rk");

    }

    quitarformato() {

        var str, lon, i, str2, numero, car, format, format2, salida;

        str = this.input.nativeElement.value;
        format = this.formato;

        str2 = '';
        lon = format.length;
        for (i = 1; i <= lon; i++) {
            car = format.substring(i - 1, i);
            if (car !== ' ' && car !== ',' && car !== '.') {
                str2 += car;
                continue;
            }
            if (car === ',') {
                str2 += ',';
            }
        }
        format2 = str2;

        str2 = '';
        lon = str.length;
        for (i = 1; i <= lon; i++) {
            car = str.substring(i - 1, i);
            if (car !== ' ' && car !== ',' && car !== '.') {
                str2 += car;
                continue;
            }
            if (car === ',') {
                str2 += '.';
            }
        }

        if (str2 !== '') {
            numero = parseFloat(str2);
            salida = form(format2, numero, "Rkm");
            if (numero > 0.0001 || numero < -0.0001) str = salida; else str = '';
            this.input.nativeElement.value = str;
        }

        this.input.nativeElement.style.textAlign = "left";

    }

    valcarac(car: string) {
        var pasa = true;
        var carsal = '\0';
        if (car === '0')
            carsal = car;
        if (car === '1')
            carsal = car;
        if (car === '2')
            carsal = car;
        if (car === '3')
            carsal = car;
        if (car === '4')
            carsal = car;
        if (car === '5')
            carsal = car;
        if (car === '6')
            carsal = car;
        if (car === '7')
            carsal = car;
        if (car === '8')
            carsal = car;
        if (car === '9')
            carsal = car;
        if (car === '-')
            carsal = car;
        if (car === ',')
            carsal = car;
        if (carsal === '\0') {
            pasa = false;
        }
        return pasa;
    }

    validarstringnumerico(seriex: string, formato: string) {

        var i, j, precoma, poscoma, postcoma, longi, longipre, longipos;
        var pasa, concoma, conerrores, salta, conmenos, formaconcoma;
        var car, carsal, xax, serie;

        if (seriex == "") return true;

        serie = "";

        for (i = 1; i <= seriex.length; i++) {
            if (seriex.charAt(i - 1) !== ' ') {
                serie = serie + seriex.charAt(i - 1);
            }
        }

        pasa = true;
        for (i = 1; i <= serie.length; i++) {
            carsal = '\0';
            car = serie.charAt(i - 1);
            if (car === '0')
                carsal = car;
            if (car === '1')
                carsal = car;
            if (car === '2')
                carsal = car;
            if (car === '3')
                carsal = car;
            if (car === '4')
                carsal = car;
            if (car === '5')
                carsal = car;
            if (car === '6')
                carsal = car;
            if (car === '7')
                carsal = car;
            if (car === '8')
                carsal = car;
            if (car === '9')
                carsal = car;
            if (car === '-' && this.valor_positivo == false)
                carsal = car;
            if (car === ',')
                carsal = car;
            if (carsal === '\0') {
                pasa = false;
                break;
            }
        }

        if (pasa === false) {
            return false;
        }

        longipre = 0;
        formaconcoma = false;
        for (i = 1; i <= formato.length; i++) {
            if (formato.charAt(i - 1) !== '.' && formato.charAt(i - 1) !== ',')
                longipre++;
            if (formato.charAt(i - 1) === ',') {
                formaconcoma = true;
                break;
            }
        }

        longipos = 0;
        salta = false;
        for (i = 1; i <= formato.length; i++) {
            if (formato.charAt(i - 1) !== '.' && salta === true)
                longipos++;
            if (formato.charAt(i - 1) === ',')
                salta = true;
        }

        if (longipos > 0) {
            longi = longipre + longipos + 1;
        } else {
            longi = longipre;
        }

        conerrores = false;

        concoma = false;
        for (j = 1; j <= serie.length; j++) {
            if (serie.charAt(j - 1) === '.' || serie.charAt(j - 1) === ',') {
                if (concoma === true) {
                    conerrores = true;
                    break;
                }
                concoma = true;
            }
        }

        conmenos = false;
        for (j = 1; j <= serie.length; j++) {
            if (serie.charAt(j - 1) === '-') {
                conmenos = true;
                if (j !== 1) {
                    conerrores = true;
                }
            }
        }

        poscoma = -1;
        for (i = 1; i <= serie.length; i++) {
            if (serie.charAt(i - 1) === '.') {
                poscoma = i - 1;
                break;
            }
            if (serie.charAt(i - 1) === ',') {
                poscoma = i - 1;
                break;
            }
        }
        if (poscoma === -1) {
            poscoma = serie.length;
        }

        precoma = 0;
        for (i = 1; i <= serie.length; i++) {
            if (serie.charAt(i - 1) !== '.' && serie.charAt(i - 1) !== ',') {
                precoma++;
            } else {
                break;
            }
        }

        postcoma = 0;
        salta = false;
        for (i = 1; i <= serie.length; i++) {
            if (salta === true) {
                postcoma++;
            }
            if (serie.charAt(i - 1) === '.' || serie.charAt(i - 1) === ',') {
                salta = true;
            }
        }

        if (concoma === true && formaconcoma === false) {
            conerrores = true;
        }

        if (precoma > longipre || postcoma > longipos) {
            conerrores = true;
        }

        if (conerrores === true) {
            return false;
        }

        return true;
    }

    onKeyReleaseTreuNumer(event: any) {

        var code;

        if (this.validarstringnumerico(this.input.nativeElement.value, this.formato) == false) {
            this.borrar_ultima_pulsacion();
            if (this.validarstringnumerico(this.input.nativeElement.value, this.formato) == false) {
                this.borrar_ultima_pulsacion();
            }
            event.preventDefault();
        }

    }

    borrar_ultima_pulsacion() {

        var posicion, texto, nuevo;

        posicion = this.input.nativeElement.selectionStart;
        texto = this.input.nativeElement.value;

        nuevo = "";
        nuevo = nuevo + texto.substring(0, posicion - 1);
        nuevo = nuevo + texto.substring(posicion, texto.length);

        this.input.nativeElement.value = nuevo;

        this.input.nativeElement.selectionStart = posicion - 1;
        this.input.nativeElement.selectionEnd = posicion - 1;
    }

    onKeyDownTreuNumer(event: any) {

        var nuevo, format, posicion, inicial, cumple, termi;
        var i;
        var letra;

        //obj = event.target;
        letra = event.key;

        // Ctrl+C or Cmd+C pressed?
        if ((event.ctrlKey || event.metaKey) && event.keyCode == 67) {
            // Do stuff.
            this.copy.emit("copy");
            return true;
        }

        // Ctrl+V or Cmd+V pressed?
        if ((event.ctrlKey || event.metaKey) && event.keyCode == 86) {
            // Do stuff.
            this.paste.emit("paste");
            return true;
        }

        // Ctrl+X or Cmd+X pressed?
        if ((event.ctrlKey || event.metaKey) && event.keyCode == 88) {
            // Do stuff.
            this.cut.emit("cut");
            this.datachange.emit("datachange");
            return true;
        }

        if (letra.length > 1 && letra !== "Backspace" && letra !== "Delete") return true;

        inicial = this.input.nativeElement.value;
        format = this.formato;
        posicion = this.input.nativeElement.selectionStart;
        termi = this.input.nativeElement.selectionEnd;

        if (letra == '.') letra = ',';

        nuevo = "";
        if (letra.length == 1) {
            nuevo = nuevo + inicial.substring(0, posicion);
            nuevo = nuevo + letra;
            nuevo = nuevo + inicial.substring(termi, inicial.length);
        } else if (letra === "Backspace") {

            if (posicion > 0 && (posicion == termi)) {

                nuevo = nuevo + inicial.substring(0, posicion - 1);
                nuevo = nuevo + inicial.substring(posicion, inicial.length);

                cumple = this.validarstringnumerico(nuevo, format);
                if (cumple === false) {
                    beep();
                    if (event.preventDefault) event.preventDefault();
                    return false;
                }

                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion - 1;
                this.input.nativeElement.selectionEnd = posicion - 1;
                this.datachange.emit("datachange");
                if (event.preventDefault) event.preventDefault();
                return false;
            } else if (posicion == 0 && (posicion == termi)) {
                beep();
                if (event.preventDefault) event.preventDefault();
                return false;
            } else if (posicion != termi) {

                nuevo = nuevo + inicial.substring(0, posicion);
                nuevo = nuevo + inicial.substring(termi, inicial.length);

                cumple = this.validarstringnumerico(nuevo, format);
                if (cumple === false) {
                    beep();
                    if (event.preventDefault) event.preventDefault();
                    return false;
                }

                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion;
                this.input.nativeElement.selectionEnd = posicion;
                this.datachange.emit("datachange");
                if (event.preventDefault) event.preventDefault();
                return false;
            }
        } else if (letra === "Delete") {

            if (posicion < inicial.length && posicion == termi) {

                nuevo = nuevo + inicial.substring(0, posicion);
                nuevo = nuevo + inicial.substring(posicion + 1, inicial.length);

                cumple = this.validarstringnumerico(nuevo, format);
                if (cumple === false) {
                    beep();
                    if (event.preventDefault) event.preventDefault();
                    return false;
                }

                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion;
                this.input.nativeElement.selectionEnd = posicion;
                this.datachange.emit("datachange");
                if (event.preventDefault) event.preventDefault();
                return false;
            } else if (posicion == inicial.length) {
                beep();
                if (event.preventDefault) event.preventDefault();
                return false;
            } else if (posicion != termi) {

                nuevo = nuevo + inicial.substring(0, posicion);
                nuevo = nuevo + inicial.substring(termi, inicial.length);

                cumple = this.validarstringnumerico(nuevo, format);
                if (cumple === false) {
                    beep();
                    if (event.preventDefault) event.preventDefault();
                    return false;
                }

                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion;
                this.input.nativeElement.selectionEnd = posicion;
                this.datachange.emit("datachange");
                if (event.preventDefault) event.preventDefault();
                return false;
            }
        }

        cumple = this.validarstringnumerico(nuevo, format);

        if (cumple === false) {
            beep();
            if (event.preventDefault) event.preventDefault();
            return false;
        }

        this.input.nativeElement.value = nuevo;
        this.input.nativeElement.selectionStart = posicion + letra.length;
        this.input.nativeElement.selectionEnd = posicion + letra.length;
        this.datachange.emit("datachange");

        if (event.preventDefault) event.preventDefault();
        return false;

    }

    onCutTreuNumer(event: any) {

        var nuevo, format, inicial, posicion, cumple, termi;
        var i;
        var letra;

        inicial = this.input.nativeElement.value;
        format = this.formato;
        posicion = this.input.nativeElement.selectionStart;
        termi = this.input.nativeElement.selectionEnd;

        nuevo = "";
        nuevo = nuevo + inicial.substring(0, posicion);
        nuevo = nuevo + inicial.substring(termi, inicial.length);
 
        cumple = this.validarstringnumerico(nuevo, format);

        if (cumple === false) {
            beep();
            if (event.preventDefault) event.preventDefault();
            return false;
        }

        return true;

    }

    onPasteTreuNumer(event: any) {

        var nuevo, format, inicial, posicion, cumple, termi;
        var i;
        var letra;

        letra = event.clipboardData.getData('Text');

        if (letra.length == 0) return true;

        inicial = this.input.nativeElement.value;
        format = this.formato;
        posicion = this.input.nativeElement.selectionStart;
        termi = this.input.nativeElement.selectionEnd;

        nuevo = "";
        if (letra.length >= 1) {
            nuevo = nuevo + inicial.substring(0, posicion);
            nuevo = nuevo + letra;
            nuevo = nuevo + inicial.substring(termi, inicial.length);
        }

        cumple = this.validarstringnumerico(nuevo, format);

        if (cumple === false) {
            beep();
            if (event.preventDefault) event.preventDefault();
            return false;
        }

        this.input.nativeElement.value = nuevo;
        this.input.nativeElement.selectionStart = posicion + letra.length;
        this.input.nativeElement.selectionEnd = posicion + letra.length;
        this.datachange.emit("datachange");
        if (event.preventDefault) event.preventDefault();
        return false;

    }

    onFocusGainTreuNumer(e: any) {

        this.dentro = true;

        this.quitarformato();
        this.input.nativeElement.select();

    }

    onFocusLostTreuNumer(e: any) {

        this.dentro = false;

        this.ponerformato();

    }

    leervalorstr() {

        var str, lon, i, str2, numero, car, format, numerostr;

        str = this.input.nativeElement.value;
        format = this.formato;

        if (str == '') return "0.0";

        str2 = '';
        lon = format.length;
        for (i = 1; i <= lon; i++) {
            car = format.substring(i - 1, i);
            if (car !== ' ' && car !== ',' && car !== '.') {
                str2 += car;
                continue;
            }
            if (car === ',') {
                str2 += '.';
            }
        }
        format = str2;

        str2 = '';
        lon = str.length;
        for (i = 1; i <= lon; i++) {
            car = str.substring(i - 1, i);
            if (car !== ' ' && car !== ',' && car !== '.') {
                str2 += car;
                continue;
            }
            if (car === ',') {
                str2 += '.';
            }
        }

        if (str2 !== '') {
            numero = parseFloat(str2);
            numerostr = form(format, numero, "Amk")
        }

        return numerostr;
    }

    focus() {
        this.input.nativeElement.focus();
    }

}
