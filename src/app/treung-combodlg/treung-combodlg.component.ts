import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TreungTextoComponent } from '../treung-texto/treung-texto.component';
declare const parseBoolean: any;

@Component({
    selector: 'treung-combodlg',
    templateUrl: './treung-combodlg.component.html',
    styleUrls: ['./treung-combodlg.component.scss']
})

export class TreungCombodlgComponent implements OnInit {

    @ViewChild('obj_combo', { static: false }) treung: TreungTextoComponent;

    @Input() id: string;
    @Input() titulo_id: string;
    @Input() disabled: boolean;
    @Input() editable: boolean;
    @Input() cursor = "";
    @Input() placeholder: string;
    maxlength = 0;
    size = 0;
    formato = "";
    value = "";
    style = "";
    respuesta = "";
    style_respuesta = "";
    ondropdown_str: string;
    ondatachange_str: string;

    @Output()
    datachange: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    dropdown: EventEmitter<string> = new EventEmitter<string>();

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

        Object.defineProperty(this.elementRef.nativeElement, 'titulo_id', {
            get: () => { return this.titulo_id; },
            set: (valo) => { this.titulo_id = valo; },
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

        this.id = this.elementRef.nativeElement.getAttribute('id');
        this.titulo_id = this.elementRef.nativeElement.getAttribute('titulo_id');
        this.maxlength = parseInt(this.elementRef.nativeElement.getAttribute('maxlength'));
        this.formato = this.elementRef.nativeElement.getAttribute('formato');
        this.disabled = parseBoolean(this.elementRef.nativeElement.getAttribute('disabled'));
        this.editable = parseBoolean(this.elementRef.nativeElement.getAttribute('editable'));
        this.size = parseInt(this.elementRef.nativeElement.getAttribute('size'));
        this.value = this.elementRef.nativeElement.getAttribute('value');
        this.style = this.elementRef.nativeElement.getAttribute('style');
        this.ondropdown_str = this.elementRef.nativeElement.getAttribute('ondropdown');
        this.ondatachange_str = this.elementRef.nativeElement.getAttribute('ondatachange');

        if (this.formato == undefined) {
            this.formato = "";
        }

        if (this.size == 0 || isNaN(this.size)) {
            this.size = 15;
        }

        if (isNaN(this.maxlength)) {
            this.maxlength = 0;
        }

    }

    ondropdown() {

        if (this.disabled == false) {
            this.dropdown.emit("dropdown");
            eval(this.ondropdown_str);
        }
        else if (this.editable == true) {
            this.dropdown.emit("dropdown");
            eval(this.ondropdown_str);
        }
    }

    cambiodata() {
        //this.datachange.emit("datachange");
        eval(this.ondatachange_str);
    }

    ngAfterViewInit() {

        this.cursor = "cursor: pointer;border-radius: 3px;"
        if (this.disabled == true) {
            this.cursor = "cursor: default;border-radius: 3px;"
            if (this.editable == true) {
                this.cursor = "cursor: pointer;border-radius: 3px;"
            }

        }

    }

    setvalue(valuex: string) {

        this.treung.setvalue(valuex);
        //this.datachange.emit("datachange");

    }

    getvalue() {
        if (this.treung.getvalue() == null) {
            return "";
        }
        return this.treung.getvalue();
    }

    setdisabled(valo: boolean) {

        this.disabled = valo; 
        this.treung.disabled = valo;

        this.cursor = "cursor: pointer;border-radius: 3px;"
        if (this.disabled == true) {
            this.cursor = "cursor: default;border-radius: 3px;"
            if (this.editable == true) {
                this.cursor = "cursor: pointer;border-radius: 3px;"
            }

        }
    }

    focus() {
        this.treung.focus();
    }

}
