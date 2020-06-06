import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { HeaderService } from '../../_service/header.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { User } from 'src/app/_models/user';
import {CardService} from '../../_service/card.service'
import { MatSort } from '@angular/material/sort';
import { ServerService } from 'src/app/_service/server.service';
import { noop as _noop } from 'lodash-es';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../dialog-box/confirm/confirmation-dialog/confirmation-dialog.component';
import { ConfirmDialogModel } from '../../_models/confirm-dialog-model';
import { ToastService } from 'src/app/_service/toast.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit , OnChanges{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource: MatTableDataSource<User>;
  users: User[];
  maxEntries: number;
  beginningId = 0;
  lastId = 20;
  full = true;

  displayColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'gender', 'actions'];
  constructor(private head: HeaderService,
              private card: CardService,
              private server: ServerService,
              private dialog: MatDialog,
              private toast: ToastService) {
    this.head.setNextTitle('User Management');
    this.maxEntries = this.card.cardList[3].total;


   }
   ngOnChanges() {
     this.getData();
   }
  ngOnInit(): void {

    this.head.setNextTitle('User Management');
    this.getData();

  }
  getData(){

    this.server.getPaginatedUser(this.beginningId, this.lastId)
      .subscribe((user: User[]) => {
        if (user){
          if (!this.users){
            this.users = user;
            console.log(this.users);
          }else{
            this.users = this.users.concat(user);
          }
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.sort = this.sort;
        }
      });
    this.setBeginEnd();

  }

  setBeginEnd() {
    if (this.lastId <= (this.maxEntries - 5)){
      this.beginningId = this.lastId + 1;
      this.lastId = this.lastId + 5;
    }else
      if (this.lastId >= this.maxEntries){
        console.log('Max Entries Reached');
    }else{
       const newEnd = this.lastId + (this.maxEntries - this.lastId);
    }
  }
  handleScroll(scrolled: boolean){
    // tslint:disable-next-line: no-console
    console.timeEnd('last scrolled');
    scrolled ? this.getData() : _noop();
    // tslint:disable-next-line: no-console
    console.time('last scrolled');
  }
  hasMore = () => !this.dataSource || this.dataSource.data.length < this.maxEntries;
  newUser() {

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;


  }
  openDialog(action, id) {
    console.log(id);
  }

  onDelete(row) {
    console.log(row.id)
    this.server.deleteUser(row.id).subscribe((result) => {
    });
    const index = this.dataSource.data.indexOf(row);
    console.log(index)
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.toast.openToast('Deleted User: ' + row.first_name, 'close');
  }
  confirmDialog(row: any){
    const message = 'Confirm Delete: ' + row.first_name  + ' ' + row.last_name;
    console.log(message);

    const dialogData = new ConfirmDialogModel('Confirm Delete of User.'
                                              , message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
       const result = dialogResult;
       console.log('row id is ' + row.id);
       console.log(result);
       if (result === true) {
        this.onDelete(row);
        //this.getData();
        //this.toast.openToast('Deleted customer: ' + row.name, 'close');
        //this.table.renderRows();
      }
      else{
        this.toast.openToast('Delete cancelled', 'Close');
      }
    });
    this.ngOnInit();

  }
}
