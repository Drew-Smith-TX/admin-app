import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { FormModel } from 'src/app/_models/FormModel';
import { UserService } from '../../_store/user.service';
import { UserState, UserStateModel } from '../../_store/user.state';
import { AddUser, GetSelectedUser, EditUser } from '../../_store/users.action';
import { FormState } from '../../_store/form.state';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  @Select(FormState.userForm) user$: Observable<any>;
  @Select(UserState.getSelectedUser) selectedUser: Observable<User>;

  filtersForm: FormGroup;
  edit: boolean;
  title: string;
  tempUser: User;
  formGroup: FormGroup;
  idCtl: FormControl;
  firstNameCtl: FormControl;
  lastNameCtl: FormControl ;
  emailCtl: FormControl ;
  genderCtl: FormControl ;
  localdata: any;
  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) public data: FormModel,
              ) {
    this.localdata = data;
    this.edit = data.edit;
    this.title = data.title;
    this.tempUser = data.user;
    console.log(this.tempUser)
    if(this.edit === true){
      this.store.dispatch(new GetSelectedUser());
    }
    if(!this.tempUser){
      const user : User = {
        firstName: '',
        lastName: '',
        gender: '',
        email: ''
      }
      this.tempUser = user;
    }
    this.idCtl = new FormControl({value: this.tempUser ? this.tempUser.id : '', disabled: true}, Validators.required)
    this.firstNameCtl = new FormControl(this.tempUser ? this.tempUser.firstName : '', 
                                        Validators.required);
    this.lastNameCtl = new FormControl(this.tempUser ? this.tempUser.lastName : '', 
                                       Validators.required);
    this.emailCtl = new FormControl(this.tempUser ? this.tempUser.email : '',
                                    [Validators.required, Validators.email]);
    this.genderCtl = new FormControl(this.tempUser ? this.tempUser.gender : '', 
                                       Validators.required);
    this.formGroup = new FormGroup({
      id: this.idCtl,
      firstName: this.firstNameCtl,
      lastName: this.lastNameCtl,
      email: this.emailCtl,
      gender: this.genderCtl
    })
  }
  
  ngOnInit() {
   
  }

  onClose() {
    this.dialogRef.close(false);
  }
 
  onConfirm() {
  if(this.edit){
    console.log(this.tempUser.id)
    this.store.dispatch(new EditUser(this.tempUser.id, this.tempUser))
    this.dialogRef.close(true)
  }else{
    console.log(this.formGroup.value.id)
    this.store.dispatch(new AddUser(this.formGroup.value))
    this.dialogRef.close(true);
  }
  
  }
}
