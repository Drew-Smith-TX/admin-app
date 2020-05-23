import { Component, OnInit, Optional, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/_models/customer';
import { Service } from 'src/app/_models/service';
import { ServerService } from 'src/app/_service/server.service';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent implements OnInit {

  localData: any;
  action: string;
  service: Service[];
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer,
              private server: ServerService)
  {
   dialogRef.disableClose = true;
   this.localData = {...data};
   this.action = this.localData.action;
   this.getServices();
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
  getServices() {
    this.server.getServices()
      .subscribe((service: any[]) =>{
        this.service = service;
        console.log(this.service)
      }, error => {
        console.log(error);
      })
  }

  

}
