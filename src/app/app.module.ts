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
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import { DialogBoxComponent } from './dialog-box/_customer_dialogs/edit-customer/dialog-box.component';
import { NewCustomerComponent } from './dialog-box/_customer_dialogs/new-customer/new-customer.component';
import { ConfirmationDialogComponent } from './dialog-box/confirm/confirmation-dialog/confirmation-dialog.component';
import { AddProjectDialogComponent } from './dialog-box/addProjectDialog/addProjectDialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    DialogBoxComponent,
    ConfirmationDialogComponent,
    NewCustomerComponent,
    AddProjectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxPaginationModule
  ],
  providers: [CardService,
    ServerService],
  bootstrap: [AppComponent],
  entryComponents: [DialogBoxComponent]
})
export class AppModule { }
