import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Finance } from '../_models/finance';
import { Customer } from '../_models/customer';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { Service } from '../_models/service';
import { rendererTypeName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log(this.baseUrl);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }

  deleteCustomers(id: number): Observable<{}> {
    const url = this.baseUrl + 'customer/' + id;
    console.log(url);
    return this.http.delete(url);


  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'customer');
  }
  updateCustomer(customer): Observable<Customer> {
    const url = this.baseUrl + 'customer/' + customer.id;
    return this.http.put<Customer>(url, customer);
  }
  getServices(): Observable<Service[]> {
    const url = this.baseUrl + 'service/';
    return this.http.get<Service[]>(url);
  }

  addCustomer(obj: any): Observable<any> {
    const url = this.baseUrl + 'customer/';
    console.log(url);
    return this.http.post<Customer>(url, obj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}