import { Component,ElementRef,Output,EventEmitter,Input  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Componentes_Angular';

  constructor() {
    //this.ondatachange = this.elementRef.nativeElement.getAttribute('ondatachange');
  }

  cambios() {
  }

  cortada() {
    //alert("Cortadaaaaaaaaaaaaaaaaaaaaaa");
  }

  solicitud() {
    alert("Solicitudddddddddddddddddddd");
  }

}
