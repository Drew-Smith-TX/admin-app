import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  localData: any;
  userForm: FormGroup;
  firstNameCtl: FormControl;
  lastNameCtl: FormControl;
  
  constructor() { }

  ngOnInit() {
  }

}
