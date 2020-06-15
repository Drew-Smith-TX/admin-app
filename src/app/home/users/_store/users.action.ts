import { User } from 'src/app/_models/user';
import { Sort } from '@angular/material/sort';
import { Type } from '@angular/core';

export class AddUser {
    static readonly type = '[User] Add';

    constructor(public payload: User) {
    }
}

export class GetUsers {
    static readonly type = '[User] Get';
    constructor(public begin: number, public end: number){}
}

export class UpdateUser {
    static readonly type = '[User] Update';

    constructor(public payload: User, public id: number) {
    }
}

export class DeleteUser {
    static readonly type = '[User] Delete';

    constructor(public id: number) {
    }
}
export class EditUser{
    static readonly type = '[User] Edit';
    constructor(public id: number, public user: User){}
}
export class SetSelectedUser {
    static readonly type = '[User] Set';

    constructor(public payload: User) {
    }
}

export class SearchUsers{
    static readonly type = '[User] Get';
    constructor(public payload: string){}
}
export class ClearUsers{
    static readonly type = '[User] Clear';
   
}
export class GetSortedUser{
    static readonly type = '[User] Get';
}

export class OrderUsersBy{
    static readonly type = '[User] Order';
    constructor(public payload: any, public isNumber: boolean, public direction: boolean){}
}
export class GetSelectedUser{
    static readonly type = '[User] Get';

}
