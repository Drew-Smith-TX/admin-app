import { Injectable } from '@angular/core';
import {CardInfo} from '../_models/card-info';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CardService {

  readonly cardList: CardInfo[] = [
    {id: 0, title: 'Welcome to Admin Management', path: 'home', color: '#58a5fd'},
    {id: 1, title: 'Customer Management', path: '/customers', color: '#1d749a'},
    {id: 2, title: 'Project Management', path: '/project', color: '#4edfc2'},
    {id: 3, title: 'Users Management', path: '/users', color: '#fcc169'},
    {id: 4, title: 'Finance Management', path: '/finance', color: '#f8697e'}
  ];
  
  selectedTitle = new Subject<string>();
  selectedIndex = new Subject<number>();
  otherTitle = new Subject<string>();
  constructor() {
    
   
 }
 setOtherTitle(message: string) {
   this.otherTitle.next(message);
 }
 getOtherTitle(): Observable<any>{
   return this.otherTitle.asObservable();
 }
 // SET TITLE
 setTitle(newTitle: string) {
   console.log('old title is ' + this.selectedTitle);
   console.log('new title is ' + newTitle);
   this.selectedTitle.next(newTitle);
   console.log( 'Changed title is ' + this.selectedTitle);
   
 }

 // SET INDEX
setSelectedIndex(id: number) {
  this.selectedIndex.next(id);
}

// GET TITLE
getSelectedTitle() {

  return this.selectedTitle.asObservable();
}

// GET INDEX
getSelectedIndex() {
  return this.selectedIndex.asObservable();
}

getCardList() {
  return this.cardList;
}
findByTitle(name: string){
  this.cardList.find(x => x.title === name);
}
}
