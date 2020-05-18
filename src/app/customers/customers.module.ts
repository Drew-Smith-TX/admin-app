import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import {MaterialsModule} from '../materials/materials.module';
import {HttpClientModule} from '@angular/common/http';
import {CardService} from '../_service/card.service';

import { ServerService } from '../_service/server.service';

@NgModule({
  declarations: [CustomersComponent,
                 ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialsModule,
    HttpClientModule,
   
  ],
  providers: [CardService,
              ServerService]
  
})
export class CustomersModule { }
