import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSimpleCrudModule } from 'ngx-simple-crud';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxNumberValidationModule } from 'ngx-number-validation';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSimpleCrudModule,
    HttpClientModule,
    NgxNumberValidationModule.forRoot({ thousandSeparator: '.', decimalSeparator: ',', decimalCount: 1 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
