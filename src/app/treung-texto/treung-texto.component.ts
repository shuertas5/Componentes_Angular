import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'treung-texto',
  templateUrl: './treung-texto.component.html',
  styleUrls: ['./treung-texto.component.scss']
})
export class TreungTextoComponent implements OnInit {

  maxlength = 0;
  size = 0;
  formato = "";
  value = "";
  ondatachange = "";
  pendiente = false;
  pendiente_valor = "";
  disabled = false;
  acento_pulsado=false;
  dentro=false;

  constructor() { 
  }

  ngOnInit(): void {
  }

  onFocusGainTreuTexto(e) {

    this.dentro = true;

    obj.select();

}

onFocusLostTreuTexto(e) {

    this.dentro = false;

}

datachange() {
    if (this.ondatachange != "") {
        eval(this.ondatachange);
    }
}

onKeyDownTreuTexto(event) {

    var nuevo, format, posicion, inicial, cumple, termi;
    var i;
    var letra, letramod;

    if (this.onkeydown != "") {
        eval(this.onkeydown);
    }

    var obj = this.shadowRoot.getElementById("myTreuTexto");
    letra = event.key;

    // Ctrl+C or Cmd+C pressed?
    if ((event.ctrlKey || event.metaKey) && event.keyCode == 67) {
        // Do stuff.
        obj.dispatchEvent(new Event("copy"));
        return true;
    }

    // Ctrl+V or Cmd+V pressed?
    if ((event.ctrlKey || event.metaKey) && event.keyCode == 86) {
        // Do stuff.
        obj.dispatchEvent(new Event("paste"));
        return true;
    }

    // Ctrl+X or Cmd+X pressed?
    if ((event.ctrlKey || event.metaKey) && event.keyCode == 88) {
        // Do stuff.
        obj.dispatchEvent(new Event("cut"));
        this.dispatchEvent(this.datachangeEvent);
        return true;
    }

    if (letra.length > 1 && letra !== "Backspace" && letra !== "Delete" && letra !== "Dead") {
        //if (event.preventDefault) event.preventDefault();
        return true;
    }

    if (letra=="Dead") {
        this.acento_pulsado=true;
        if (event.preventDefault) event.preventDefault();
        return true;
    }

    inicial = obj.value;
    format = this.formato;
    posicion = obj.selectionStart;
    termi = obj.selectionEnd;

    nuevo = "";
    if (letra.length == 1) {

        if (this.acento_pulsado==true) {
            letra=letraacentuada(letra);
            this.acento_pulsado=false;
        }

       letramod = letra;
        if (format.toLowerCase() == "lowercase") {
            letramod = letra.toLowerCase();
        }

        if (format.toLowerCase() == "uppercase") {
            letramod = letra.toUpperCase();
        }

        nuevo = "";
        nuevo = nuevo + inicial.substring(0, posicion);
        nuevo = nuevo + letramod;
        nuevo = nuevo + inicial.substring(termi, inicial.length);

    } else if (letra === "Backspace") {
        if (posicion > 0 && (posicion == termi)) {
            nuevo = nuevo + inicial.substring(0, posicion - 1);
            nuevo = nuevo + inicial.substring(posicion, inicial.length);
            obj.value = nuevo;
            obj.selectionStart = posicion - 1;
            obj.selectionEnd = posicion - 1;
            this.dispatchEvent(this.datachangeEvent);
            if (event.preventDefault) event.preventDefault();
            return false;
        } else if (posicion == 0 && (posicion == termi)) {
            this.beep();
            if (event.preventDefault) event.preventDefault();
            return false;
        } else if (posicion != termi) {
            nuevo = nuevo + inicial.substring(0, posicion);
            nuevo = nuevo + inicial.substring(termi, inicial.length);
            obj.value = nuevo;
            obj.selectionStart = posicion;
            obj.selectionEnd = posicion;
            this.dispatchEvent(this.datachangeEvent);
            if (event.preventDefault) event.preventDefault();
            return false;
        }
    } else if (letra === "Delete") {
        if (posicion < inicial.length && posicion == termi) {
            nuevo = nuevo + inicial.substring(0, posicion);
            nuevo = nuevo + inicial.substring(posicion + 1, inicial.length);
            obj.value = nuevo;
            obj.selectionStart = posicion;
            obj.selectionEnd = posicion;
            this.dispatchEvent(this.datachangeEvent);
            if (event.preventDefault) event.preventDefault();
            return false;
        } else if (posicion == inicial.length) {
            this.beep();
            if (event.preventDefault) event.preventDefault();
            return false;
        } else if (posicion != termi) {
            nuevo = nuevo + inicial.substring(0, posicion);
            nuevo = nuevo + inicial.substring(termi, inicial.length);
            obj.value = nuevo;
            obj.selectionStart = posicion;
            obj.selectionEnd = posicion;
            this.dispatchEvent(this.datachangeEvent);
            if (event.preventDefault) event.preventDefault();
            return false;
        }
    }
    else if (letra=="Dead") {
        nuevo=obj.value;
        return true;
    }
    else {
        nuevo=obj.value;            
    }

    if (obj.maxLength > 0) {
        if (nuevo.length > obj.maxLength) {
            this.beep();
        }
        else {
            obj.value = nuevo;
            obj.selectionStart = posicion + letramod.length;
            obj.selectionEnd = posicion + letramod.length;
            this.dispatchEvent(this.datachangeEvent);
        }
    }
    else {
        obj.value = nuevo;
        obj.selectionStart = posicion + letramod.length;
        obj.selectionEnd = posicion + letramod.length;
        this.dispatchEvent(this.datachangeEvent);
    }

    if (event.preventDefault) event.preventDefault();
    return false;
}

onPasteTreuTexto(event) {

    var nuevo, format, inicial, posicion, cumple, termi;
    var i;
    var letra, letramod;

    var obj = this.shadowRoot.getElementById("myTreuTexto");
    letra = event.clipboardData.getData('Text');

    if (letra.length == 0)
        return true;

    inicial = obj.value;
    format = this.formato;
    posicion = obj.selectionStart;
    termi = obj.selectionEnd;

    letramod = letra;
    if (format.toLowerCase() == "lowercase") {
        letramod = letra.toLowerCase();
    }

    if (format.toLowerCase() == "uppercase") {
        letramod = letra.toUpperCase();
    }

    nuevo = "";
    nuevo = nuevo + inicial.substring(0, posicion);
    nuevo = nuevo + letramod;
    nuevo = nuevo + inicial.substring(termi, inicial.length);

    if (obj.maxLength > 0) {
        if (nuevo.length > obj.maxLength) {
            this.beep();
        }
        else {
            obj.value = nuevo;
            obj.selectionStart = posicion + letramod.length;
            obj.selectionEnd = posicion + letramod.length;
            this.dispatchEvent(this.datachangeEvent);

        }
    }
    else {
        obj.value = nuevo;
        obj.selectionStart = posicion + letramod.length;
        obj.selectionEnd = posicion + letramod.length;
        this.dispatchEvent(this.datachangeEvent);

    }

    if (event.preventDefault) event.preventDefault();
    return false;
}

}

