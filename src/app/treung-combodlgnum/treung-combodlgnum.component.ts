import { Component, OnInit, ElementRef, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { TreungNumerComponent } from '../treung-numer/treung-numer.component';
declare const parseBoolean: any;

@Component({
    selector: 'treung-combodlgnum',
    templateUrl: './treung-combodlgnum.component.html',
    styleUrls: ['./treung-combodlgnum.component.scss']
})
export class TreungCombodlgnumComponent implements OnInit {

    @ViewChild('obj_combonum', { static: false }) treung: TreungNumerComponent; // remove { static: false } if you're using Angular < 8 

    @Input() id: string;
    @Input() titulo_id: string;
    @Input() size: any;
    @Input() formato: any;
    @Input() value: any;
    @Input() disabled: boolean;
    @Input() style: string;
    @Input() style_respuesta: string;
    @Input() editable: boolean;
    @Input() valor_positivo: boolean;
    @Input() cursor: string;
    
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
        this.formato = this.elementRef.nativeElement.getAttribute('formato');
        this.disabled = parseBoolean(this.elementRef.nativeElement.getAttribute('disabled'));
        this.editable = parseBoolean(this.elementRef.nativeElement.getAttribute('editable'));
        this.size = parseInt(this.elementRef.nativeElement.getAttribute('size'));
        this.value = parseFloat(this.elementRef.nativeElement.getAttribute('value'));
        this.style = this.elementRef.nativeElement.getAttribute('style');
        this.style_respuesta = this.elementRef.nativeElement.getAttribute('style_respuesta');
        this.valor_positivo = parseBoolean(this.elementRef.nativeElement.getAttribute('valor_positivo'));
        this.ondropdown_str = this.elementRef.nativeElement.getAttribute('ondropdown');
        this.ondatachange_str = this.elementRef.nativeElement.getAttribute('ondatachange');

        if (this.formato == undefined) {
            this.formato = "###.###";
        }

        if (this.size == 0 || isNaN(this.size)) {
            this.size = 15;
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

    setvalue(valuex: number) {

        this.treung.setvalue(valuex);
        //this.datachange.emit("datachange");

    }

    getvalue() {
        if (this.treung.getvalue() == null) {
            return 0.0;
        }
        return this.treung.getvalue();
    }

    setdisabled(valo: boolean) {

        this.disabled = valo; 
        this.treung.setdisabled(valo);

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
