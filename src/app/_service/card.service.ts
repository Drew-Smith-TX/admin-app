import { Injectable } from '@angular/core';
import {CardInfo} from '../_models/card-info';
import { Subject, Observable } from 'rxjs';
import { ServerService } from './server.service';
@Injectable({
  providedIn: 'root'
})
export class CardService {
  totalCount;
  readonly cardList: CardInfo[] = [
    {id: 0, title: 'Welcome to Admin Management Tracker', path: 'home',
      color: '#58a5fd', total: null},
    {id: 1, title: 'Customer Management', path: 'customers',
      color: '#1d749a', total: null},
    {id: 2, title: 'Project Management', path: 'projects',
      color: '#4edfc2', total: null},
    {id: 3, title: 'Users Management', path: 'users',
      color: '#fcc169', total: null},
    {id: 4, title: 'Finance Management', path: 'finance',
      color: '#f8697e', total: null}
  ];
  
  // selectedTitle = new Subject<string>();
  // selectedIndex = new Subject<number>();
  // otherTitle = new Subject<string>();
  constructor(private service: ServerService) {
   this.setTotals(); 
   
 }

 setTotals() {
   for(let i = 1; i < 5; i++){
    this.service.getTotalCount(this.cardList[i].path)
      .subscribe(resp => {
        this.cardList[i].total = resp.length;
        console.log(this.cardList[i].total)
      })
   }
  // this.service.getCustomerCount().subscribe(resp =>{
  //   this.cardList[1].total = resp.length;
  //   console.log(resp.length);
  //   console.log(this.cardList[1].total);
  // });
  // this.service.getProjectCount().subscribe(resp => {
  //   this.cardList[2].total = resp.length;
  // })
  
 
 }
//  setOtherTitle(message: string) {
//    this.otherTitle.next(message);
//  }
//  getOtherTitle(): Observable<any>{
//    return this.otherTitle.asObservable();
//  }
 // SET TITLE
 setTitle(newTitle: string) {
  //  console.log('old title is ' + this.selectedTitle);
  //  console.log('new title is ' + newTitle);
  //  this.selectedTitle.next(newTitle);
  //  console.log( 'Changed title is ' + this.selectedTitle);
   
 }

 // SET INDEX
setSelectedIndex(id: number) {
  // this.selectedIndex.next(id);
}

// GET TITLE
getSelectedTitle() {

  // return this.selectedTitle.asObservable();
}

// GET INDEX
getSelectedIndex() {
  // return this.selectedIndex.asObservable();
}

getCardList() {
  return this.cardList;
}
findByTitle(name: string){
  this.cardList.find(x => x.title === name);
}
}
