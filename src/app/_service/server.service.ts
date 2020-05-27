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

import { Project } from '../_models/project';




@Injectable({
  providedIn: 'root'
})
export class ServerService {
  baseUrl = environment.apiUrl;
  customerCount;
  constructor(private http: HttpClient,
              ) {
    console.log(this.baseUrl);
  }
  getCustomerCount() {
    const url = this.baseUrl + 'customers?_start=0&_limit=1000';
    console.log('customer url')
    console.log(url);
    return this.http.get<any>(url);
    
  }
  getTotalCount(heading: string) {
    console.log(heading)
    const url = this.baseUrl + heading + '?_start=0&_limit=1000';
    console.log(url)
    return this.http.get<any>(url);
 
  }
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + 'projects/');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/')
      .pipe(catchError(this.handleError));
  }

  deleteCustomers(id: number): Observable<{}> {
    const url = this.baseUrl + 'customers/' + id;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError));
  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'customers')
      .pipe(
        catchError(this.handleError)
      );
  }
  updateCustomer(customer): Observable<Customer> {
    const url = this.baseUrl + 'customers/' + customer.id;
    return this.http.put<Customer>(url, customer);
  }
  getServices(): Observable<Service[]> {
    const url = this.baseUrl + 'service/';
    return this.http.get<Service[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  addProject(obj: any): Observable<any>{
    const url = this.baseUrl + 'projects/';
    console.log(url)
    console.log('in service')
    console.log(obj)
    return this.http.post<Project>(url,obj,{
      headers: new HttpHeaders({'Content-Type':'application/json'})
    })
    .pipe(catchError(this.handleError));
  }
  addCustomer(obj: any): Observable<any> {
    const url = this.baseUrl + 'customers/';
    console.log(url);
    return this.http.post<Customer>(url, obj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
      .pipe(catchError(this.handleError));
  }
  deleteProject(id: number): Observable<Project>{
    const url = this.baseUrl + 'projects/' + id;
    return this.http.delete<Project>(url)
      .pipe(
        catchError(this.handleError)
    );
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