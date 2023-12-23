import { Component, OnInit, HostListener, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
declare const acoplarseriemax: any;
declare const letraacentuada: any;
declare const parseBoolean: any;
declare const beep: any;

@Component({
    selector: 'treung-password',
    templateUrl: './treung-password.component.html',
    styleUrls: ['./treung-password.component.scss']
})

export class TreungPasswordComponent {

    @ViewChild('obj_pass', { static: false }) input: ElementRef; // remove { static: false } if you're using Angular < 8 

    @Input() id: string;
    @Input() maxlength = 0;
    @Input() size: any;
    @Input() formato: any;
    @Input() value = "";
    @Input() disabled = false;
    @Input() placeholder: string;
    acento_pulsado = false;
    dentro = false;
    getdis: string;
    place: string;
    ondatachange_str: string;

    @Output()
    copy: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    paste: EventEmitter<string> = new EventEmitter<string>();
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
            set: (valo) => { this.disabled = valo; this.input.nativeElement.disabled = valo; },
            enumerable: true
        });

    }

    ngOnInit(): void {

        this.datachange.subscribe((valor) => {
            this.cambiodata();
        })

        this.id = this.elementRef.nativeElement.getAttribute('id');
        this.maxlength = parseInt(this.elementRef.nativeElement.getAttribute('maxlength'));
        this.formato = this.elementRef.nativeElement.getAttribute('formato');
        this.disabled = parseBoolean(this.elementRef.nativeElement.getAttribute('disabled'));
        this.size = parseInt(this.elementRef.nativeElement.getAttribute('size'));
        this.value = this.elementRef.nativeElement.getAttribute('value');
        this.ondatachange_str = this.elementRef.nativeElement.getAttribute('ondatachange');

        if (this.disabled == true) {
            this.getdis = "disabled";
        }
        else {
            this.getdis = "";
        }

        if (this.formato == undefined || this.formato == null) {
            this.formato = "";
        }

        if (this.placeholder == undefined || this.placeholder == null) {
            this.place = "";
        }
        else {
            this.place = this.placeholder;
        }

        if (this.size == 0 || isNaN(this.size)) {
            this.size = 15;
        }

        if (isNaN(this.maxlength)) {
            this.maxlength = 0;
        }

    }

    ngAfterViewInit() {

        if (this.value != undefined) {
            this.setvalue(this.value);
        }

    }

    cambiodata() {
        eval(this.ondatachange_str);
    }

    setvalue(valuex: string) {

        if (this.maxlength > 0) {
            this.input.nativeElement.value = acoplarseriemax(valuex, this.maxlength);
        }
        else {
            this.input.nativeElement.value = valuex;
        }
        if (this.formato == "lowercase") {
            this.input.nativeElement.value = this.input.nativeElement.value.toLocaleLowerCase();
        }
        if (this.formato == "uppercase") {
            this.input.nativeElement.value = this.input.nativeElement.value.toLocaleUpperCase();
        }
        this.datachange.emit("datachange");

    }

    getvalue() {
        if (this.input.nativeElement.value == null) return "";
        if (this.formato == "lowercase") {
            this.input.nativeElement.value = this.input.nativeElement.value.toLocaleLowerCase();
        }
        if (this.formato == "uppercase") {
            this.input.nativeElement.value = this.input.nativeElement.value.toLocaleUpperCase();
        }
        return this.input.nativeElement.value;
    }

    onFocusGainTreuPassword(e: any) {

        this.dentro = true;

        this.input.nativeElement.select();

    }

    onFocusLostTreuPassword(e: any) {

        this.dentro = false;

    }

    @HostListener('keyup', ['$event'])
    onKeyReleaseTreuPassword(event: KeyboardEvent): boolean {

        var inicial, format, letramod, posicion, termi;

        inicial = this.input.nativeElement.value;
        format = this.formato;
        posicion = this.input.nativeElement.selectionStart;
        termi = this.input.nativeElement.selectionEnd;

        letramod = inicial;
        if (format.toLowerCase() == "lowercase") {
            letramod = inicial.toLowerCase();
            this.input.nativeElement.value = letramod;
            this.input.nativeElement.selectionStart = posicion;
            this.input.nativeElement.selectionEnd = posicion;
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
        }

        if (format.toLowerCase() == "uppercase") {
            letramod = inicial.toUpperCase();
            this.input.nativeElement.value = letramod;
            this.input.nativeElement.selectionStart = posicion;
            this.input.nativeElement.selectionEnd = posicion;
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
        }

        return true;

    }

    @HostListener('keydown', ['$event'])
    onKeyDownTreuPassword(event: KeyboardEvent): boolean {

        var nuevo, format, posicion, inicial, cumple, termi;
        var i;
        var letra, letramod;

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

        if (event.keyCode == 0) {
            this.acento_pulsado = true;
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
        }

        if (letra.length > 1 && letra !== "Backspace" && letra !== "Delete" && this.acento_pulsado !== true) {
            //if (event.preventDefault) event.preventDefault();
            return true;
        }

        posicion = this.input.nativeElement.selectionStart;
        termi = this.input.nativeElement.selectionEnd;

        if (this.formato == "lowercase") {
            this.input.nativeElement.value = this.input.nativeElement.value.toLocaleLowerCase();
        }
        if (this.formato == "uppercase") {
            this.input.nativeElement.value = this.input.nativeElement.value.toLocaleUpperCase();
        }

        inicial = this.input.nativeElement.value;
        format = this.formato;
        letramod = letra;

        nuevo = "";
        if (letra.length == 1) {

            if (this.acento_pulsado == true) {
                //letra = letraacentuada(letra);
                this.acento_pulsado = false;
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            }

            if (format.toLocaleLowerCase() == "lowercase") {
                letramod = letra.toLocaleLowerCase();
            }

            if (format.toLocaleLowerCase() == "uppercase") {
                letramod = letra.toLocaleUpperCase();
            }

            nuevo = "";
            nuevo = nuevo + inicial.substring(0, posicion);
            nuevo = nuevo + letramod;
            nuevo = nuevo + inicial.substring(termi, inicial.length);

        } else if (letra === "Backspace") {
            if (posicion > 0 && (posicion == termi)) {
                nuevo = nuevo + inicial.substring(0, posicion - 1);
                nuevo = nuevo + inicial.substring(posicion, inicial.length);
                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion - 1;
                this.input.nativeElement.selectionEnd = posicion - 1;
                this.datachange.emit("datachange");
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            } else if (posicion == 0 && (posicion == termi)) {
                beep();
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            } else if (posicion != termi) {
                nuevo = nuevo + inicial.substring(0, posicion);
                nuevo = nuevo + inicial.substring(termi, inicial.length);
                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion;
                this.input.nativeElement.selectionEnd = posicion;
                this.datachange.emit("datachange");
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            }
        } else if (letra === "Delete") {
            if (posicion < inicial.length && posicion == termi) {
                nuevo = nuevo + inicial.substring(0, posicion);
                nuevo = nuevo + inicial.substring(posicion + 1, inicial.length);
                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion;
                this.input.nativeElement.selectionEnd = posicion;
                this.datachange.emit("datachange");
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            } else if (posicion == inicial.length) {
                beep();
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            } else if (posicion != termi) {
                nuevo = nuevo + inicial.substring(0, posicion);
                nuevo = nuevo + inicial.substring(termi, inicial.length);
                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion;
                this.input.nativeElement.selectionEnd = posicion;
                this.datachange.emit("datachange");
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            }
        }
        else if (letra == "Dead") {
            nuevo = this.input.nativeElement.value;
            return true;
        }
        else {
            nuevo = this.input.nativeElement.value;
        }

        if (this.maxlength > 0) {
            if (nuevo.length > this.maxlength) {
                beep();
                this.input.nativeElement.value = inicial;
            }
            else {
                if (this.acento_pulsado==true) return false;
                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion + letramod.length;
                this.input.nativeElement.selectionEnd = posicion + letramod.length;
                this.datachange.emit("datachange");
            }
        }
        else {
            if (this.acento_pulsado==true) return false;
            this.input.nativeElement.value = nuevo;
            this.input.nativeElement.selectionStart = posicion + letramod.length;
            this.input.nativeElement.selectionEnd = posicion + letramod.length;
            this.datachange.emit("datachange");
        }

        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
    }

    @HostListener('paste', ['$event'])
    onPasteTreuPassword(event: ClipboardEvent) {

        var nuevo, format, inicial, posicion, cumple, termi;
        var i;
        var letra, letramod;

        if (event.clipboardData!=null) {
            letra = event.clipboardData.getData('Text');
        }
        else {
            letra="";
        }

        if (letra.length == 0)
            return true;

        inicial = this.input.nativeElement.value;
        format = this.formato;
        posicion = this.input.nativeElement.selectionStart;
        termi = this.input.nativeElement.selectionEnd;

        letramod = letra;
        if (format.toLowerCase() == "lowercase") {
            letramod = letra.toLocaleLowerCase();
        }

        if (format.toLowerCase() == "uppercase") {
            letramod = letra.toLocaleUpperCase();
        }

        nuevo = "";
        nuevo = nuevo + inicial.substring(0, posicion);
        nuevo = nuevo + letramod;
        nuevo = nuevo + inicial.substring(termi, inicial.length);

        if (this.maxlength > 0) {
            if (nuevo.length > this.maxlength) {
                beep();
                this.input.nativeElement.value = inicial;
            }
            else {
                this.input.nativeElement.value = nuevo;
                this.input.nativeElement.selectionStart = posicion + letramod.length;
                this.input.nativeElement.selectionEnd = posicion + letramod.length;
                this.datachange.emit("datachange");

            }
        }
        else {
            this.input.nativeElement.value = nuevo;
            this.input.nativeElement.selectionStart = posicion + letramod.length;
            this.input.nativeElement.selectionEnd = posicion + letramod.length;
            this.datachange.emit("datachange");

        }

        event.stopImmediatePropagation();
        event.preventDefault();
        return;
    }

    focus() {
        this.input.nativeElement.focus();
    }

}
