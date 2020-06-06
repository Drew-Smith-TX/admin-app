import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService<T> {
url = environment.apiUrl;
constructor(private http: HttpClient,
            private endpoint: string) { }
  public create(item: T): Observable<T> {
    return this.http.post<T>(`${this.url}/${this.endpoint}`, item);
  }
  public update(item: T, id: number): Observable<T> {
		return this.http.put<T>(`${this.url}/${this.endpoint}/${id}`, item);
  }
  public getById(id: number): Observable<T> {
		return this.http.get<T>(`${this.url}/${this.endpoint}/${id}`);
  }
  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${this.endpoint}}`);
  }
  public deleteById(id: number): Observable<T>{
    return this.http.delete<T>(`${this.url}/${this.endpoint}/${id}`);
  }
}
