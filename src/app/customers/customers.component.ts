import { Component, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef, TemplateRef } from '@angular/core';
import { CardService } from '../_service/card.service';
import { ConfirmDialogModel } from '../_models/confirm-dialog-model';
import { ConfirmationDialogComponent } from '../dialog-box/confirmation-dialog/confirmation-dialog.component'

import { ServerService } from '../_service/server.service';
import { Customer } from '../_models/customer';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { NewCustomerComponent } from '../dialog-box/new-customer/new-customer.component';





@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnChanges {


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  tempCustomer: Customer;
  dataSource: Customer[] = [];
  titleSet = false;
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
    'actions'
  ];
  constructor(public cardService: CardService,
              private service: ServerService,
              public dialog: MatDialog) {
    console.log('constructor');
    this.cardService.setSelectedIndex(1);
    this.cardService.setTitle('Customer Management');

  }

  ngOnInit(): void {
    this.cardService.selectedTitle.next('Customer Management');
    this.getCustomers();
    this.cardService.setSelectedIndex(1);
    this.cardService.setOtherTitle('Customer Management');
    if (window.screen.width < 500) {
      this.mobile = true;
    }
  }

  ngOnChanges() {
    this.getCustomers();
    this.cardService.setSelectedIndex(1);
    this.cardService.setTitle('Customer Management');
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
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

  confirmDialog(elem) {
    const message = 'Confirm Delete: ' + elem.name;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
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

  newCustomer() {

    const message = 'Add New Customer';
    const dialogData: Customer = new Customer();
    const dialogRef = this.dialog.open(NewCustomerComponent, {
      data: dialogData,
      autoFocus: true,
      height: 'auto',
      width: 'auto',
      direction: "ltr"
    });
    dialogRef.afterClosed().subscribe(customerData => {
      if (customerData.event) {
        this.addCustomer(customerData.event);

      }
    });


  }


  onDelete(elem) {
    this.dataSource = this.dataSource.filter(i => i.id !== elem.id);
    this.service.deleteCustomers(elem.id).subscribe();
    this.ngOnInit();
  }

  addCustomer(data) {
    this.service.addCustomer(data).subscribe(
      (data: Customer) => {
        console.log(data);
      }, (error: any) => {
        console.log(error);
      }
    );
    this.ngOnInit();
  }



}
