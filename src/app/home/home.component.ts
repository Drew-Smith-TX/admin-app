import { Component, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardInfo } from '../_models/card-info';
import { EventEmitter } from '@angular/core';
import { CardService } from '../_service/card.service';
import {Subscription} from 'rxjs';
import { HeaderService } from '../_service/header.service';
import { ServerService } from '../_service/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardList: CardInfo[] ;
  breakpoint;
  cardCount = new Map();
  constructor(public cardService: CardService,
              public head: HeaderService,
              public service: ServerService,
              ){
    this.head.setNextTitle(this.cardService.cardList[0].title);
    
  }
// getTableLengths() {
//   this.service.getCustomerCount().subscribe(resp =>{
//     this.cardCount.set('customer', resp.length);
//   });
  
// }
onResize(event) {
  this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
}

ngOnInit()  {
  this.cardList = this.cardService.getCardList();
  this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
 }

navigate(elem){
  console.log('ondex : ' + elem);
  
  
}
}
