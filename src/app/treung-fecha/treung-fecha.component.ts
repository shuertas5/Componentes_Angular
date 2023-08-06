import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
declare const parseBoolean: any;
declare const beep: any;

@Component({
	selector: 'treung-fecha',
	templateUrl: './treung-fecha.component.html',
	styleUrls: ['./treung-fecha.component.scss']
})

export class TreungFechaComponent implements OnInit {

	@ViewChild('obj_fecha', { static: false }) input: ElementRef; // remove { static: false } if you're using Angular < 8 

	@Input() id: string;
	@Input() size: any;
	@Input() disabled: any;
	@Input() value: any;
	getdis: string;
	ondatachange_str: string;

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

	}

	ngOnInit(): void {

        this.datachange.subscribe((valor)=>{
            this.cambiodata();
        })
        
        this.id = this.elementRef.nativeElement.getAttribute('id');
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

        if (this.size == 0 || isNaN(this.size)) {
            this.size = 15;
        }

	}

	ngAfterViewInit() {

		if (this.value != undefined) {
			this.setvalue(this.value);
		}

	}

	setvalue(valuex: any) {
		var vali= valuex.substring(0,10);
		var date = new Date(vali);
		date.setDate(date.getDate());
		this.input.nativeElement.valueAsDate = date;
		this.datachange.emit("datachange");

	}

	getvalue() {
		if (this.input.nativeElement == null) return null;
		return this.input.nativeElement.value;
	}

    cambiodata() {
        eval(this.ondatachange_str);
    }

	ondatachange() {
		this.datachange.emit("datachange");
	}

}
