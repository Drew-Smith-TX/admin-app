import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CardService } from './_service/card.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { HomeComponent } from './home/home.component';
import { ServerService } from './_service/server.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {FormsModule} from '@angular/forms';

import { ConfirmationDialogComponent } from './dialog-box/confirmation-dialog/confirmation-dialog.component';
import { NewCustomerComponent } from './dialog-box/new-customer/new-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    DialogBoxComponent,
    ConfirmationDialogComponent,
    NewCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [CardService,
    ServerService],
  bootstrap: [AppComponent],
  entryComponents: [DialogBoxComponent]
})
export class AppModule { }
