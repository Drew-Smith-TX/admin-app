import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/_models/customer';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { ServerService } from 'src/app/_service/server.service';
import { Service } from 'src/app/_models/service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  services: Service[];
  localData: any;
  customerForm: FormGroup;
  nameCtl: FormControl;
  emailCtl: FormControl;
  locationCtl: FormControl;
  serviceCtl: FormControl;
  dateCtl: FormControl;
  contactPersonCtl: FormControl;
  contactEmailCtl: FormControl;
  descriptionCtl: FormControl;
  websiteCtl: FormControl;
  constructor(public dialogRef: MatDialogRef < NewCustomerComponent > ,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer,
              private service: ServerService)
  {
    dialogRef.disableClose = true;
    this.localData = { ...data };

    // Create controls for each element of the Customer class
    this.nameCtl = new FormControl('', Validators.required);
    this.emailCtl = new FormControl('',[ Validators.required, Validators.email]);
    this.locationCtl = new FormControl('', Validators.required);
    this.serviceCtl = new FormControl('', Validators.nullValidator);
    this.dateCtl = new FormControl('', Validators.required);
    this.contactPersonCtl = new FormControl('', Validators.required);
    this.contactEmailCtl = new FormControl('', [Validators.required, Validators.email]);
    this.websiteCtl = new FormControl('', Validators.required);
    this.descriptionCtl = new FormControl('', Validators.required);
    // Create form group containing controls
    this.customerForm = new FormGroup({
      name: this.nameCtl,
      email: this.emailCtl,
      location: this.locationCtl,
      service: this.serviceCtl,
      date: this.dateCtl,
      contactPerson: this.contactPersonCtl,
      contactEmail: this.contactEmailCtl,
      website: this.websiteCtl,
      description: this.descriptionCtl
    });
    this.getServices();
  }
  ngOnInit() {
    this.getServices();
  }
  getServices() {
    this.service.getServices()
      .subscribe((service: any[]) => {
        this.services = service;
      }, error => {
        console.log(error);
      });
  }
  onClose() {
    this.dialogRef.close(false);
    console.log(this.customerForm)
  }
  onConfirm() {
    
    console.log(this.services)
    this.localData.customer = new Customer(this.customerForm.value)
    this.dialogRef.close({ event: this.localData.customer});
  }
  formCheck() {
    return this.nameCtl.valid && this.emailCtl.valid && this.locationCtl.valid
           && this.dateCtl.valid && this.contactPersonCtl.valid && this.contactEmailCtl.valid
           && this.serviceCtl.valid && this.descriptionCtl.valid;
  }

  }
