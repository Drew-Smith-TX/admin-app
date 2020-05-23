import { Component, OnInit, OnChanges, ViewChild, AfterViewChecked, ElementRef, TemplateRef } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Customer } from '../_models/customer';
import { NavComponent } from '../nav/nav.component';
import { HeaderService } from '../_service/header.service';
import { ConfirmDialogModel } from '../_models/confirm-dialog-model';
import { ConfirmationDialogComponent } from '../dialog-box/confirm/confirmation-dialog/confirmation-dialog.component';
import { DialogBoxComponent } from '../dialog-box/_customer_dialogs/edit-customer/dialog-box.component';
import { NewCustomerComponent } from '../dialog-box/_customer_dialogs/new-customer/new-customer.component';
import { ServerService } from '../_service/server.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnChanges {

  @ViewChild(NavComponent, {static: false}) navBar: NavComponent;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  tempCustomer: Customer;
  dataSource: Customer[] = [];
  
  result: boolean;
  mobile: boolean;
  // Columns to be displayed in the browser
  tableColumns = ['id',
    'name',
    'contactPerson',
    'email',
    'website',
    'location',
    'services',
    'description',
    'actions'
   
  ];
  constructor(
              private service: ServerService,
              public dialog: MatDialog,
              public head: HeaderService) {
    this.head.setNextTitle('Customer Management');
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnChanges() {
    this.getCustomers();
  }
  // edit dialog
  // calls dialogBoxComponent
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: 'auto',
      autoFocus: true,
      height: 'auto',
      hasBackdrop: true,
      direction: 'ltr',
      data: obj,
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Result Data' + result);
      this.updateRowData(result.data);
      this.ngOnInit();
    });
  }

  updateRowData(data) {
    console.log(data)
    if (data) {
      this.dataSource = this.dataSource.filter((value, key) => {
        if (value.id === data.id) {
          value = data;
        }
        this.service.updateCustomer(data).subscribe();
        this.table.renderRows();
      });
    }
  }

  getCustomers() {
    this.service.getCustomers()
      .subscribe((customer: any[]) => {
        this.dataSource = customer;
      }, error => {
        console.log(error);
      });
  }
  //delete confirm dialog
  confirmDialog(elem) {
    const message = 'Confirm Delete: ' + elem.name;
    const dialogData = new ConfirmDialogModel('Confirm Delete of Customer.', message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result)
      if (this.result == true) {
        console.log('Is this ever every entered')
        this.onDelete(elem);
        console.log(elem);
      }
    });
  }

  // Create new Customer Dialog
  newCustomer() {
    
    const dialogData: Customer = new Customer();
    const dialogRef = this.dialog.open(NewCustomerComponent, {
    
      data: dialogData,
      autoFocus: true,
      height: 'auto',
      width: 'auto',
      hasBackdrop: true,
      direction: 'ltr',
      panelClass: 'background'

    });
    dialogRef.afterClosed().subscribe(customerData => {
      if (customerData.event) {
        this.addCustomer(customerData.event);
      }
    });
  }


  // Delete customer element from array, call service to remove
  onDelete(elem) {
   // this.dataSource = this.dataSource.filter(i => i.id !== elem.id);
    
    this.service.deleteCustomers(elem.id).subscribe();
     
    this.ngOnInit();
  }

  addCustomer(customerdata) {
    this.service.addCustomer(customerdata).subscribe(
      (customerdata: Customer) => {
        console.log(customerdata);
      }, (error: any) => {
        console.log(error);
      }
    );
    this.ngOnInit();
  }



}
