import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel } from 'src/app/_models/confirm-dialog-model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent  {
  title: string;
  message: any;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel){
                console.log(data.title);
                this.title = data.title;
                this.message= data.message;
                this.dialogRef.disableClose = true;

  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  onDismiss() {
    this.dialogRef.close(false);
  }
}

