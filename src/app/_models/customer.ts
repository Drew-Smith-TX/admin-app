export class Customer {
    id?: number;
    name: string;
    email: string;
    location: string;
    service: string;
    date: string;
    contactPerson: string;
    contactEmail: string;
    website: string;
    constructor(init?: Partial<Customer>){
        Object.assign(this, init);
    }
}