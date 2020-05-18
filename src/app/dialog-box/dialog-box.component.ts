import { Component, OnInit, Optional, Inject } from '@angular/core';
import {Customer} from '../_models/customer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent implements OnInit {

  localData: any;
  action: string;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer)
  {
   dialogRef.disableClose = true;
   this.localData = {...data};
   this.action = this.localData.action;
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  doAction() {
    console.log(this.localData)
    this.dialogRef.close({event: this.doAction, data: this.localData});
  }
  ngOnInit(): void {
  }

  

}
