import { User } from './user';

export class FormModel {
    constructor( public title: string, public edit: boolean, public user: User){}
}
