import { Component, OnInit, OnChanges, ViewChild, AfterViewChecked, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Customer } from '../../_models/customer';
import { NavComponent } from '../../nav/nav.component';
import { HeaderService } from '../../_service/header.service';
import { ConfirmDialogModel } from '../../_models/confirm-dialog-model';
import { ConfirmationDialogComponent } from '../../dialog-box/confirm/confirmation-dialog/confirmation-dialog.component';
import { DialogBoxComponent } from '../../dialog-box/_customer_dialogs/edit-customer/dialog-box.component';
import { NewCustomerComponent } from '../../dialog-box/_customer_dialogs/new-customer/new-customer.component';
import { ServerService } from '../../_service/server.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {  ToastService } from 'src/app/_service/toast.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnChanges {

  @ViewChild(NavComponent, {static: false}) navBar: NavComponent;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tempCustomer: Customer;
  customers: Customer[] = [];
  dataSource;
  pageNumber =  1;
  totalRecord: number;
  result: boolean;
  mobile: boolean;
  selectedRow = -1;
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
              public head: HeaderService,
              private toast: ToastService,
              private routerLink: Router) {
    this.head.setNextTitle('Customer Management');
    this.getCustomers();
  }
 
  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnChanges() {
    this.getCustomers();
    if( window.innerWidth < 600){
      this.mobile = true;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    

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
      console.log('Result Data' + result.data);
      if (result.event === 'Cancel'){
        this.toast.openToast('Edit cancelled', 'close');
      }else{
        this.updateRowData(result.data);
        this.ngOnInit();
      }
    });
  }

  updateRowData(data) {
    let ifFound = false;
    if (data) {
      this.dataSource = this.dataSource.data.filter((value, key) => {
        if (value.id === data.id) {
          value = data;
          ifFound = true;
        }
        if (ifFound){
          this.toast.openToast('Successfully edited Customer' + data.name, 'close')
          this.service.updateCustomer(data).subscribe();
          this.table.renderRows();
        }
      });
    }
  }


  getCustomers() {
    this.service.getCustomers()
      .subscribe((customer: any[]) => {
        this.customers = customer;
        this.dataSource = new MatTableDataSource<Customer>(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });
    
    // this.dataSource = new MatTableDataSource<Customer>(this.customers);
    // this.dataSource.paginator = this.paginator;
   
    
  }
  //delete confirm dialog
  confirmDialog(elem) {
    const message = 'Confirm Delete: ' + elem.name;
    const dialogData = new ConfirmDialogModel('Confirm Delete of Customer.'
                                              , message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result)
      if (this.result === true) {
        this.onDelete(elem);
        console.log(elem);
        this.toast.openToast('Deleted customer: ' + elem.name, 'close');
      }
      else{
        this.toast.openToast('Delete cancelled', 'Close');
      }
    });
    //this.ngOnInit();
    this.table.renderRows();
  }
  goToUrl(website: string){
    const location =  'http://' + website;
    window.open(location);

    
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
      }else{
        this.toast.openToast('Action Cancelled', 'Close')
      }
    });
  }


  // Delete customer element from array, call service to remove
  onDelete(elem) {
    this.service.deleteCustomers(elem.id).subscribe(
      
    );
    this.ngOnInit();
  }

  addCustomer(customerdata) {
    this.service.addCustomer(customerdata).subscribe(
      (customerdata: Customer) => {
        console.log(customerdata);
        this.toast.openToast('Customer Successfully Added', 'Close')
      }, (error: any) => {
        console.log(error);
      }
    );
    this.ngOnInit();
  }
  
  highlightRow(row){
    this.selectedRow = row.id;
  }



}
