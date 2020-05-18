import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule, MatGridList} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {  MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


const MaterialComponents = [

  MatBadgeModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialsModule { }
