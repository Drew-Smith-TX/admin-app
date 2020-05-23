import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CardInfo } from '../_models/card-info';
import { EventEmitter } from '@angular/core';
import { CardService } from '../_service/card.service';
import {Subscription} from 'rxjs';
import { HeaderService } from '../_service/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardList: CardInfo[] ;
  breakpoint;
  constructor(public cardService: CardService,
              public head: HeaderService){
    this.head.setNextTitle('Welcome to Admin Managment');
  }
 
onResize(event) {
  this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
}

ngOnInit()  {
  this.cardList = this.cardService.getCardList();
  this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
 }

navigate(index: number){
  
}
}
