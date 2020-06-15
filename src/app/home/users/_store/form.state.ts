import {State, Selector, Store} from '@ngxs/store';
import { Injectable } from '@angular/core';


@State(
    {
        name: 'userForm',
        defaults: {
            user: {
                model: [],
                dirty: false,
                status: '',
                errors: {}
            }
        }
    }
)
@Injectable()
export class FormState {
    constructor(private store: Store){}

    @Selector() 
    static userForm(state: any){
        return state.user;
}
}
