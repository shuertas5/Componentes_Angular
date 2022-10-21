import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreungNumerComponent } from './treung-numer/treung-numer.component';
import { TreungTextoComponent } from './treung-texto/treung-texto.component';

@NgModule({
  declarations: [
    AppComponent,
    TreungNumerComponent,
    TreungTextoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
