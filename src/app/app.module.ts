import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DoBootstrap } from '@angular/core';

import { AppComponent } from './app.component';
import { TreungNumerComponent } from './treung-numer/treung-numer.component';
import { TreungTextoComponent } from './treung-texto/treung-texto.component';
import { TreungCombodlgComponent } from './treung-combodlg/treung-combodlg.component';
import { TreungCombodlgnumComponent } from './treung-combodlgnum/treung-combodlgnum.component';
import { TreungPasswordComponent } from './treung-password/treung-password.component';
import { TreungTextareaComponent } from './treung-textarea/treung-textarea.component';
import { TreungFechaComponent } from './treung-fecha/treung-fecha.component';
import { FormsModule } from '@angular/forms';

declare var require: any;

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
        FormsModule
    ],
    exports: [],
    providers: [],
    entryComponents: [
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
export class AppModule implements DoBootstrap {
    constructor(private injector: Injector) {
        const el0 = createCustomElement(AppComponent, { injector: this.injector });
        customElements.define('app-root', el0);
        const el1 = createCustomElement(TreungNumerComponent, { injector: this.injector });
        customElements.define('treungc-numer', el1);
        const el2 = createCustomElement(TreungTextoComponent, { injector: this.injector });
        customElements.define('treungc-texto', el2);
        const el3 = createCustomElement(TreungCombodlgComponent, { injector: this.injector });
        customElements.define('treungc-combodlg', el3);
        const el4 = createCustomElement(TreungCombodlgnumComponent, { injector: this.injector });
        customElements.define('treungc-combodlgnum', el4);
        const el5 = createCustomElement(TreungPasswordComponent, { injector: this.injector });
        customElements.define('treungc-password', el5);
        const el6 = createCustomElement(TreungTextareaComponent, { injector: this.injector });
        customElements.define('treungc-textarea', el6);
        const el7 = createCustomElement(TreungFechaComponent, { injector: this.injector });
        customElements.define('treungc-fecha', el7);
    }
    ngDoBootstrap(): void {
    }
}
//export class AppModule {}