import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../_models/user';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl = environment.apiUrl + 'users/';
    constructor(private http: HttpClient) {
    }

    fetchUsers(begin, end) {
      console.log('begin: ' + begin);
      console.log('end: ' + end);
        // return this.http.get<User[]>(this.baseUrl);
      const url = this.baseUrl + '?id_gte=' + begin + '&id_lte=' + end;
      return this.http.get<User[]>(url)
          .pipe(
            catchError(this.handleError)
          );
    }

    deleteUser(id: number) {
        return this.http.delete(this.baseUrl  + id);
    }

    addUser(payload: User) {


      return this.http.post<User>(this.baseUrl, payload, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
        .pipe(catchError(this.handleError));
    }

    updateUser(payload: User) {
      const json = JSON.stringify(payload)
      console.log(json)
      return this.http.put<User>(this.baseUrl + payload.id, json, {
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
