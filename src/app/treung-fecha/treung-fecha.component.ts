import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
declare const parseBoolean: any;
declare const beep: any;

@Component({
	selector: 'treung-fecha',
	templateUrl: './treung-fecha.component.html',
	styleUrls: ['./treung-fecha.component.scss']
})

export class TreungFechaComponent implements OnInit {

	@ViewChild('obj', { static: false }) input: ElementRef; // remove { static: false } if you're using Angular < 8 

	@Input() size = 12;
	//pendiente = false;
	//pendiente_valor = "";
	@Input() disabled = false;
	@Input() value: any;

	@Output()
	datachange: EventEmitter<string> = new EventEmitter<string>();

	constructor(private elementRef: ElementRef) {
		this.disabled = parseBoolean(this.elementRef.nativeElement.getAttribute('disabled'));
		this.size = parseInt(this.elementRef.nativeElement.getAttribute('size'));
		this.value = this.elementRef.nativeElement.getAttribute('value');
	}

	ngOnInit(): void {

		if (this.disabled == undefined || this.disabled == null) {
            this.disabled = false;
        }
 
        if (this.size == undefined) {
            this.size = 12;
        }
	}

	ngAfterViewInit() {

        if (this.value != undefined) {
            this.setvalue(this.value);
        }

    }

	setvalue(valuex: any) {

        /*if (obj == null) {
            this.pendiente = true;
            this.pendiente_valor = valuex;
            return;
        }*/

        this.input.nativeElement.value = valuex;
		this.datachange.emit("datachange");
 
    }

    getvalue() {
        if (this.input.nativeElement == null) return "";
        return this.input.nativeElement.value;
    }

	ondatachange() {
		this.datachange.emit("datachange");
	}

}
