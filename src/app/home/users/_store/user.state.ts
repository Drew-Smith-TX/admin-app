import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import {User} from '../../../_models/user';
import {UserService} from './user.service';
import {tap} from 'rxjs/operators';
import {AddUser, DeleteUser, GetUsers, OrderUsersBy, SetSelectedUser, UpdateUser, SearchUsers, ClearUsers, GetSelectedUser, EditUser} from './users.action';
import { Injectable, Type } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import {Sort} from './sort.model';

import { CdkTextColumn } from '@angular/cdk/table';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

export class UserStateModel{
    users: User[];
    selectedUser: User;
    sortUsers: User[];
    filter: string;
}


@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        selectedUser: null,
        sortUsers: null,
        filter: null
    }
})



@Injectable()
export class UserState{
    constructor(private userService: UserService,
                private store: Store){}

    @Selector()
    static getUserList(state: UserStateModel){
        return state.users;
    }
    @Selector()
    static getSelectedUser(state: UserStateModel){
        console.log(state.selectedUser);
        return state.selectedUser;
    }
    @Selector()
    static getSortedUser(state: UserStateModel){
        return state.sortUsers;
    }

    @Action(GetUsers)
    getUsers({getState, setState}: StateContext<UserStateModel>, {begin, end}: GetUsers) {
        return this.userService.fetchUsers(begin, end).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                users: state.users.concat(result),
            });
        }));
    }

    @Action(AddUser)
    addUser({getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
        return this.userService.addUser(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                users: [...state.users, result]
            });
        }));
    }
    @Action(UpdateUser)
    updateUser({getState, setState}: StateContext<UserStateModel>, {payload, id}: UpdateUser) {
        return this.userService.updateUser(payload).pipe(tap((result) => {
            const state = getState();
            const userList = [...state.users];
            const userIndex = userList.findIndex(item => item.id === id);
            userList[userIndex] = result;
            setState({
                ...state,
                users: userList,
            });
        }));
    }
    @Action(DeleteUser)
    deleteUser({getState, setState}: StateContext<UserStateModel>, {id}: DeleteUser) {
        return this.userService.deleteUser(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.users.filter(item => item.id !== id);
            setState({
                ...state,
                users: filteredArray,
            });
        }));
    }
    @Action(SetSelectedUser)
    setSelectedUser({getState, setState}: StateContext<UserStateModel>, {payload}: SetSelectedUser) {
        const state = getState();
        console.log('Payload is : ');
        console.log(payload);
        setState({
            ...state,
            selectedUser: payload
        });
        console.log(this.store.dispatch(new GetSelectedUser()))
    }
    @Action(SearchUsers)
    searchUsers({getState, setState}: StateContext<UserStateModel>, {payload}: SearchUsers){
        const state = getState();
        let filter;
        if (payload !== ''){
            const idNum: number = +payload;
            console.log(idNum);
            filter = state.users.filter( it =>
                 it.firstName.toLowerCase().includes(payload));
            // let dictionary = Object.assign({}, ...state.users.map())
            if (!filter){
                filter = state.users.filter(it => it.lastName.includes(payload));
                if (!filter){
                    filter = state.users.filter(it => it.email.includes(payload));
                }
                if (!filter && idNum){
                    filter = state.users.filter(it => it.id === idNum);
                }
            }
            console.log('Filter is ');
            console.log(filter);
            filter = this.removeDuplicates(filter);
            console.log('Filter after duplicate removal')
            console.log(filter)
            if (filter.length > 0){
                setState({
                    ...state,
                    sortUsers: filter
                });
            }
        }
       
    }
    @Action(ClearUsers)
    clearUsers({getState, setState}: StateContext<UserStateModel>){
        const state = getState();
        this.store.reset(state.sortUsers);

    }
    @Action(EditUser)
    editUser(ctx: StateContext<UserStateModel>,{id, user}: EditUser ){
        ctx.setState(
            patch({
                users: updateItem<User>(item => item.id === id, user)
            })
        )
        user.id = id;
        console.log('user value in user.state.ts')
        console.log(user)
        this.userService.updateUser(user).subscribe()
    }
    @Action(OrderUsersBy)
    orderUsersBy<T>( {getState, setState, patchState }: StateContext<UserStateModel>,  {payload, isNumber, direction}: OrderUsersBy) {
        const state = getState();
        console.log('state before sort:');
        console.log(state.users);
        const sorted: User[]  = this.sort(state.users, payload, isNumber, direction);
        console.log('sorted is');
        console.log(state.users);
        setState({
            ...state,
            users: sorted
        });

    }

sort(array: User[], property: string, isNumber: boolean, direction: boolean){
    if (direction){
        if (isNumber){
            return array.sort((item1, item2) =>
                (item1[property] > item2[property]) ? 1 : -1 );
        }else{
            return array.sort((item1, item2) =>
                (item1[property].toLowerCase() > item2[property].toLowerCase()) ? 1 : -1);
        }
    }else{
        if (isNumber){
            return array.sort((item1, item2) =>
                (item1[property] > item2[property]) ? -1 : 1 );
        }else{
            return array.sort((item1, item2) =>
                (item1[property].toLowerCase() > item2[property].toLowerCase()) ? -1 : 1);
        }
    }
}
removeDuplicates(objArray: User[]): User[] {
    console.log('filter array is')
    console.log(objArray)
    const unique = new Set(objArray.map( e=> JSON.stringify(e)))
    const res = Array.from(unique).map(e => JSON.parse(e));
    console.log('Res is')
    console.log(res)
    objArray = res;
    console.log(objArray)
    return res;
}

}
