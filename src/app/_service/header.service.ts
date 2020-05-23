import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
 public titleSubject: Subject<string> = new Subject<string>();
constructor() { 
  
}
setNextTitle(title: string) {
  this.titleSubject.next(title);
}

}
