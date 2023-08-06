import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreungNumerComponent } from './treung-numer/treung-numer.component';
import { TreungTextoComponent } from './treung-texto/treung-texto.component';
import { TreungCombodlgComponent } from './treung-combodlg/treung-combodlg.component';
import { TreungCombodlgnumComponent } from './treung-combodlgnum/treung-combodlgnum.component';
import { TreungPasswordComponent } from './treung-password/treung-password.component';
import { TreungTextareaComponent } from './treung-textarea/treung-textarea.component';
import { TreungFechaComponent } from './treung-fecha/treung-fecha.component';

@NgModule({
  declarations: [
    AppComponent,
    TreungNumerComponent,
    TreungTextoComponent,
    TreungCombodlgComponent,
    TreungCombodlgnumComponent,
    TreungPasswordComponent,
    TreungTextareaComponent,
    TreungFechaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    AppComponent,
    TreungNumerComponent,
    TreungTextoComponent,
    TreungCombodlgComponent,
    TreungCombodlgnumComponent,
    TreungPasswordComponent,
    TreungTextareaComponent,
    TreungFechaComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    TreungNumerComponent,
    TreungTextoComponent,
    TreungCombodlgComponent,
    TreungCombodlgnumComponent,
    TreungPasswordComponent,
    TreungTextareaComponent,
    TreungFechaComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el1 = createCustomElement(TreungNumerComponent, { injector });
    customElements.define('treung-numer', el1);
    const el2 = createCustomElement(TreungTextoComponent, { injector });
    customElements.define('treung-texto', el2);
    const el3 = createCustomElement(TreungCombodlgComponent, { injector });
    customElements.define('treung-combodlg', el3);
    const el4 = createCustomElement(TreungCombodlgnumComponent, { injector });
    customElements.define('treung-combodlgnum', el4);
    const el5 = createCustomElement(TreungPasswordComponent, { injector });
    customElements.define('treung-password', el5);
    const el6 = createCustomElement(TreungTextareaComponent, { injector });
    customElements.define('treung-textarea', el6);
    const el7 = createCustomElement(TreungFechaComponent, { injector });
    customElements.define('treung-fecha', el7);
  }
  ngDoBootstrap() {}
}
//export class AppModule {}
