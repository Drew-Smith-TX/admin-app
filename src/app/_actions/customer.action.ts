import { Customer } from '../_models/customer';

export class AddCustomer{
    static readonly type = '[Customer] Add';
    constructor(payload: Customer){}
}
export class GetCustomers {
    static readonly type = '[User] Get';
}

export class UpdateCustomer {
    static readonly type = '[Customer] Update';

    constructor(public payload: Customer, public id: number) {
    }
}

export class DeleteCustomer {
    static readonly type = '[Customer] Delete';

    constructor(public id: number) {
    }
}

export class SetSelectedCustomer {
    static readonly type = '[Customer] Set';

    constructor(public payload: Customer) {
    }
}