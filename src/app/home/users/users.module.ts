import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {ScrollContainerComponent} from './scroll-container/scroll-container/scroll-container.component'
import {MaterialsModule} from '../../materials/materials.module';
@NgModule({
  declarations: [UsersComponent, ScrollContainerComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialsModule
  ]
})
export class UsersModule { }
