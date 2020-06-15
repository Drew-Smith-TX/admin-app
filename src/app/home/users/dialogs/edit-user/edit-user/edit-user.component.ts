import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { Store } from '@ngxs/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormModel } from 'src/app/_models/FormModel';
import { AddUserDialogComponent } from '../../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  filtersForm: FormGroup;

  title: string;
  tempUser: User;
  formGroup: FormGroup;
  firstNameCtl: FormControl ;
  lastNameCtl: FormControl ;
  emailCtl: FormControl ;
  genderCtl: FormControl ;
  
  constructor(private store: Store,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: FormModel,
              public dialogRef: MatDialogRef<AddUserDialogComponent>) {
    
    
    
   }

  ngOnInit() {
  }

}
