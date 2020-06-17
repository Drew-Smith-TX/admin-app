import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { HeaderService } from '../../_service/header.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { User } from 'src/app/_models/user';
import { CardService } from '../../_service/card.service'
import { MatSort } from '@angular/material/sort';
import { ServerService } from 'src/app/_service/server.service';
import { noop as _noop } from 'lodash-es';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../dialog-box/confirm/confirmation-dialog/confirmation-dialog.component';
import { ConfirmDialogModel } from '../../_models/confirm-dialog-model';
import { ToastService } from 'src/app/_service/toast.service';
import { Store, Select } from '@ngxs/store';
import { GetUsers, DeleteUser, AddUser, SearchUsers, ClearUsers, OrderUsersBy, SetSelectedUser, GetSelectedUser, ClearSortUsers } from './_store/users.action';
import { UserState, UserStateModel } from './_store/user.state';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormModel } from 'src/app/_models/FormModel';
import { FormArray } from '@angular/forms';
import { StateReset, StateResetAll } from 'ngxs-reset-plugin';
import { UserService } from './_store/user.service';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { filter } from 'rxjs/operators';
// tslint:disable-next-line: import-spacing
import { AddUserDialogComponent } from 
        './dialogs/add-user-dialog/add-user-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @Select(UserState.getUserList) userStore: Observable<User[]>;
  @Select(UserState.getSortedUser) filterUser: Observable<User[]>
  @Select(UserState.getSelectedUser) selectedUser: Observable<User>;
  

  dataSource: MatTableDataSource<User>;
  
  maxEntries: number;   // Max entries of userlist
  beginningId: number;  // first Id of userlist
  lastId: number;       // Last Id of userlist
  //full = true;          //
  showSpinner = false;  // Boolean for showing loading spinner
  filterString: string; // String to filter lazy loaded entries of table
  newFormGroup: FormGroup;
  direction = true;     // sort direction, asc = true, desc = false
  displayColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender',
                             'actions'];
  constructor(private head: HeaderService,
    private card: CardService,
    private dialog: MatDialog,
    private toast: ToastService,
    private store: Store,
    private spinner: NgxSpinnerService,
  ) {
    this.head.setNextTitle('User Management');
    this.maxEntries = this.card.cardList[3].total;


  }
  ngOnChanges() {
    this.getData();
  }
  ngOnInit(): void {
    this.setBeginEnd();
    this.head.setNextTitle('User Management');
    this.store.dispatch(new GetUsers(this.beginningId, this.lastId));
  }
  getData() {
    console.log(this.beginningId)
    console.log(this.lastId)
    this.setBeginEnd();
    this.store.dispatch(new GetUsers(this.beginningId, this.lastId));

  }

  setBeginEnd() {
    console.log(this.beginningId)
    console.log(this.lastId)
    console.log(this.maxEntries)
    if (!this.beginningId && !this.lastId) {
      this.beginningId = 0;
      this.lastId = 20;
    } else {
      const entriesLeft = this.maxEntries - this.lastId;
      console.log('entries left: ' + entriesLeft)
      if (entriesLeft > 0 && entriesLeft > 10) {
        console.log('greater than 10, greater than 0')
        this.beginningId = this.lastId + 1;
        this.lastId = this.lastId + 10;
      } else if (entriesLeft < 10 && entriesLeft > 1) {
        console.log('less than 10, greater than 1')
        this.beginningId = this.lastId;
        this.lastId = this.maxEntries;
      } else {
        this.resetBeginEnd();
      }
    }

  }
  resetBeginEnd() {
    console.log('resetBeginEnd call')
    this.beginningId = null;
    this.lastId = null;
  }
  handleScroll(scrolled: boolean) {
    // tslint:disable-next-line: no-console
    console.timeEnd('last scrolled');
    if (scrolled) {
      this.getData();
      this.setBeginEnd();
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
    //scrolled ? [this.getData(), this.showSpinner = true] : _noop();
    // tslint:disable-next-line: no-console
    console.time('last scrolled');
  }
  hasMore = () => !this.dataSource || this.dataSource.data.length
    < this.maxEntries;

  applyFilter(filterValue: string) {
    filterValue = filterValue.toLowerCase();
    console.log('filter value is ' + filterValue)
    if (!filterValue) {
      this.store.dispatch(new ClearSortUsers())
      this.filterString = null;
      console.log('EMPTY REACHED')
      this.ngOnInit()
    }
    else if (filterValue !== '') {
      this.filterString = filterValue;
      // filterValue = filterValue.trim().toLowerCase();
      this.store.dispatch(new SearchUsers(filterValue));
      console.log(this.userStore);
    }

  }
  openDialog(action, id) {
    console.log(id);
  }

  onDelete(row) {
    console.log(row.id)
    this.store.dispatch(new DeleteUser(row.id));

  }
  editUserDialog(row: any) {
    const title = 'Update User: ' + row.firstName;
    console.log(title);
  }
  editAddUser(title: string, edit: any, user: User) {
    const dialogTitle = title ? title : 'Edit User ' + user.firstName + 
                        ' ' + user.lastName;
    console.log(dialogTitle)
    const dialogData = new FormModel(dialogTitle, edit, user);
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: dialogData,
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      const result = dialogResult;
      console.log(result)
      this.toast.openToast(
        (result) ? ('Succesful: ' + dialogTitle) :
          ('Cancelled: ' + dialogTitle),
        'Close'
      )
    })
  }
  confirmDialog(row: any) {
    const message = 'Confirm Delete: ' + row.first_name + ' ' + row.last_name;
    const dialogData = new ConfirmDialogModel('Confirm Delete of User.',
                       message);
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
        this.toast.openToast('Delete Successful', 'Close')
      }
      else {
        this.toast.openToast('Delete cancelled', 'Close');
      }
    });
    this.table.renderRows();


  }
  columnSelected(column: string) {
    console.log('this direction is : ' + this.direction)
    this.direction = !this.direction;
    const isNumber = isNaN(Number(this.userStore[column]));
    this.store.dispatch(new OrderUsersBy(column, isNumber, this.direction));
    this.table.renderRows();
  }
  onClear(searchString: string) {
    this.filterString = '';
    searchString = '';
    this.store.dispatch(new ClearSortUsers());
  }
}
