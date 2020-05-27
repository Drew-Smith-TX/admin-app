import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialsModule} from '../../materials/materials.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialsModule,
    HttpClientModule,
    MaterialsModule
  ]
})
export class ProjectsModule { }
