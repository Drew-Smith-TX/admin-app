import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
 private _title: string;

constructor() { 
  this._title = 'Welcome to Admin Management';
}
set title(title: string){
  this._title = title;
}
get title(){
  return this._title;
}

}
