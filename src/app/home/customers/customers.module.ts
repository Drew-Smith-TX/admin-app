import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import {MaterialsModule} from '../../materials/materials.module';
import {HttpClientModule} from '@angular/common/http';
import {CardService} from '../../_service/card.service';
import {ToastService } from '../../_service/toast.service'
import { ServerService } from '../../_service/server.service';
import { RedirectComponent } from './redirect/redirect.component';
@NgModule({
  declarations: [CustomersComponent, RedirectComponent,
                 ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialsModule,
    HttpClientModule,
    
   
  ],
  providers: [CardService,
              ServerService,
              ToastService]
  
})
export class CustomersModule { }
