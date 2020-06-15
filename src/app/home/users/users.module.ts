import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {ScrollContainerComponent} from './scroll-container/scroll-container/scroll-container.component'
import {MaterialsModule} from '../../materials/materials.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {FormsModule} from '@angular/forms'
@NgModule({
  declarations: [UsersComponent, ScrollContainerComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialsModule,
    NgxSpinnerModule,
    NgxsFormPluginModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class UsersModule { }
